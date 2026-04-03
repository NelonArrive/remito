package dev.remito.order;

import java.math.BigDecimal;

public record OrderItemDto(
	String productName,
	BigDecimal price,
	Integer quantity,
	BigDecimal total
) {
	static OrderItemDto from(OrderItem item) {
		return new OrderItemDto(
			item.getNameSnapshot(),
			item.getPriceSnapshot(),
			item.getQuantity(),
			item.getPriceSnapshot().multiply(BigDecimal.valueOf(item.getQuantity()))
		);
	}
}