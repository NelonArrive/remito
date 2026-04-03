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
	static CartItemDto from(CartItem item) {
		return new CartItemDto(
			item.getId(),
			item.getProduct().getId(),
			item.getProduct().getName(),
			item.getProduct().getImageUrl(),
			item.getPriceSnapshot(),
			item.getQuantity(),
			item.getPriceSnapshot().multiply(BigDecimal.valueOf(item.getQuantity()))
		);
	}
}