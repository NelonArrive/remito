package dev.remito.brand;

public record BrandDto(
	Long id,
	String name,
	String logoUrl,
	boolean isActive
) {
	static BrandDto from(Brand b) {
		return new BrandDto(
			b.getId(),
			b.getName(),
			b.getLogoUrl(),
			b.isActive()
		);
	}
}