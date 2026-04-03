package dev.remito.security;

import dev.remito.exception.TokenRefreshException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {
	
	private final RefreshTokenRepository refreshTokenRepository;
	
	@Value("${jwt.refresh-token-expiration-ms}")
	private long refreshTokenExpMs;
	
	public String createRefreshToken(Long userId) {
		String token = UUID.randomUUID().toString();
		refreshTokenRepository.save(
			RefreshToken.builder()
				.token(token)
				.userId(userId)
				.ttlSeconds(refreshTokenExpMs / 1000)
				.build()
		);
		return token;
	}
	
	public RefreshToken verifyExpiration(String token) {
		return refreshTokenRepository.findByToken(token)
			.orElseThrow(() -> new TokenRefreshException("Refresh token expired or not found"));
	}
	
	public String rotateRefreshToken(String oldToken) {
		RefreshToken old = verifyExpiration(oldToken);
		refreshTokenRepository.delete(old);
		return createRefreshToken(old.getUserId());
	}
	
	public void deleteByToken(String token) {
		refreshTokenRepository.findByToken(token)
			.ifPresent(refreshTokenRepository::delete);
	}
}
