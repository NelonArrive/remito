package dev.remito.user;

public record UserDto(
	Long id,
	String email,
	String name,
	String role
) {
	public static UserDto from(User user) {
		return new UserDto(
			user.getId(),
			user.getEmail(),
			user.getName(),
			user.getRole().name()
		);
	}
}
