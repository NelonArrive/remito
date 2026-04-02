package dev.remito.product;

import java.math.BigDecimal;

public record ProductDto(
	Long id,
	String name,
	String slug,
	String description,
	BigDecimal price,
	Integer stockQuantity,
	String categoryName,
	String brandName,
	String colorName,
	String colorHex,
	String imageUrl,
	boolean isActive
) {
	static ProductDto from(Product p) {
		return new ProductDto(
			p.getId(),
			p.getName(),
			p.getSlug(),
			p.getDescription(),
			p.getPrice(),
			p.getStockQuantity(),
			p.getCategory() != null ? p.getCategory().getName() : null,
			p.getBrand() != null ? p.getBrand().getName() : null,
			p.getColor() != null ? p.getColor().getName() : null,
			p.getColor() != null ? p.getColor().getHexCode() : null,
			p.getImageUrl(),
			p.isActive()
		);
	}
}