package dev.remito.product;

import java.math.BigDecimal;
import java.util.List;

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
	boolean isActive,
	List<String> gallery
) {
}
