package dev.remito.security;

public class TokenRefreshException extends RuntimeException {
	public TokenRefreshException(String message) {
		super(message);
	}
}
