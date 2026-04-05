package dev.remito.cart;

import java.math.BigDecimal;
import java.util.List;

public record CartDto(
	String sessionToken,
	List<CartItemDto> items,
	BigDecimal totalAmount,
	int totalItems
) {
}