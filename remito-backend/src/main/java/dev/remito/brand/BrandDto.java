package dev.remito.brand;

public record BrandDto(
	Long id,
	String name,
	String logoUrl,
	boolean isActive
) {
}