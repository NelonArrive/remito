package dev.remito.user.auth;

public record AuthResponse(
	Long id,
	String email,
	String name
) {
}
