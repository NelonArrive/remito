package dev.remito.order;

import java.math.BigDecimal;

public record OrderItemDto(
	String productName,
	BigDecimal price,
	Integer quantity,
	BigDecimal total
) {
}