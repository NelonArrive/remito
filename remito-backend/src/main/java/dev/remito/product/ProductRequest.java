package dev.remito.product;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.util.List;

public record ProductRequest(
	@NotBlank String name,
	@NotBlank String slug,
	String description,
	@NotNull BigDecimal price,
	Integer stockQuantity,
	@NotNull Long categoryId,
	Long brandId,
	Long colorId,
	String imageUrl,
	List<String> gallery
) {
}
