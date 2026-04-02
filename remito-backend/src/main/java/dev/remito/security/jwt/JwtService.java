package dev.remito.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Base64;
import java.util.Date;

@Slf4j
@Component
public class JwtService {
	
	@Value("${jwt.secret}")
	private String secret;
	
	@Value("${jwt.access-token-expiration-ms}")
	private long accessTokenExpMs;
	
	private Key getKey() {
		return Keys.hmacShaKeyFor(Base64.getDecoder().decode(secret));
	}
	
	public String generateAccessToken(UserDetails userDetails) {
		return Jwts.builder()
			.setSubject(userDetails.getUsername())
			.claim("roles", userDetails.getAuthorities())
			.setIssuedAt(new Date())
			.setExpiration(new Date(System.currentTimeMillis() + accessTokenExpMs))
			.signWith(getKey(), SignatureAlgorithm.HS256)
			.compact();
	}
	
	public String generateAccessToken(Long userId, String email, String name) {
		return Jwts.builder()
			.setSubject(email)
			.claim("userId", userId)
			.claim("name", name)
			.setIssuedAt(new Date())
			.setExpiration(new Date(System.currentTimeMillis() + accessTokenExpMs))
			.signWith(getKey(), SignatureAlgorithm.HS256)
			.compact();
	}
	
	public String extractEmail(String token) {
		return parseClaims(token).getSubject();
	}
	
	public boolean isValid(String token, UserDetails userDetails) {
		try {
			String email = extractEmail(token);
			return email.equals(userDetails.getUsername()) && !isExpired(token);
		} catch (JwtException e) {
			log.warn("Invalid JWT: {}", e.getMessage());
			return false;
		}
	}
	
	private boolean isExpired(String token) {
		return parseClaims(token).getExpiration().before(new Date());
	}
	
	private Claims parseClaims(String token) {
		return Jwts.parserBuilder()
			.setSigningKey(getKey())
			.build()
			.parseClaimsJws(token)
			.getBody();
	}
	
}
