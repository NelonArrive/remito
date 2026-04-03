package dev.remito.color;

public record ColorDto(
	Long id,
	String name,
	String hexCode
) {
	static ColorDto from(Color c) {
		return new ColorDto(
			c.getId(),
			c.getName(),
			c.getHexCode()
		);
	}
}