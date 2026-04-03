package dev.remito.user;

public record UserDto(
	Long id,
	String email,
	String name,
	String role
) {
}
