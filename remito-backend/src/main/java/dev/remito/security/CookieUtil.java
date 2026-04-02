package dev.remito.security;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Optional;

@Component
public class CookieUtil {
	
	@Value("${jwt.access-token-expiration-ms}")
	private long accessTokenExpMs;
	
	@Value("${jwt.refresh-token-expiration-ms}")
	private long refreshTokenExpMs;
	
	private static final String ACCESS_COOKIE  = "access_token";
	private static final String REFRESH_COOKIE = "refresh_token";
	
	public void setAccessTokenCookie(HttpServletResponse response, String token) {
		addCookie(response, ACCESS_COOKIE, token, (int) (accessTokenExpMs / 1000));
	}
	
	public void setRefreshTokenCookie(HttpServletResponse response, String token) {
		addCookie(response, REFRESH_COOKIE, token, (int) (refreshTokenExpMs / 1000));
	}
	
	public Optional<String> getAccessTokenFromCookie(HttpServletRequest request) {
		return getCookie(request, ACCESS_COOKIE);
	}
	
	public Optional<String> getRefreshTokenFromCookie(HttpServletRequest request) {
		return getCookie(request, REFRESH_COOKIE);
	}
	
	public void deleteAllTokenCookies(HttpServletResponse response) {
		addCookie(response, ACCESS_COOKIE, "", 0);
		addCookie(response, REFRESH_COOKIE, "", 0);
	}
	
	private Optional<String> getCookie(HttpServletRequest request, String name) {
		if (request.getCookies() == null) return Optional.empty();
		return Arrays.stream(request.getCookies())
			.filter(c -> c.getName().equals(name))
			.map(Cookie::getValue)
			.findFirst();
	}
	
	private void addCookie(HttpServletResponse response, String name, String value, int maxAge) {
		Cookie cookie = new Cookie(name, value);
		cookie.setHttpOnly(true);
		cookie.setSecure(false); // false on dev
		cookie.setPath("/");
		cookie.setMaxAge(maxAge);
		response.addCookie(cookie);
	}
	
}
