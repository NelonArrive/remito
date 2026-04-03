package dev.remito.cart;

import java.math.BigDecimal;

public record CartItemDto(
	Long id,
	Long productId,
	String productName,
	String productImage,
	BigDecimal price,
	Integer quantity,
	BigDecimal total
) {
}