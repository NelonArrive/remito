package dev.remito.product;

import java.math.BigDecimal;

public record ProductFilter(
	Long categoryId,
	Long brandId,
	Long colorId,
	BigDecimal priceFrom,
	BigDecimal priceTo,
	Boolean inStock,
	String sortBy,
	String sortDir,
	int page,
	int size
) {
	public ProductFilter {
		if (sortBy == null) sortBy = "createdAt";
		if (sortDir == null) sortDir = "desc";
		if (size == 0) size = 20;
	}
}