package dev.remito.cart;

import java.math.BigDecimal;
import java.util.List;

public record CartDto(
	String sessionToken,
	List<CartItemDto> items,
	BigDecimal totalAmount,
	int totalItems
) {
	static CartDto from(Cart cart) {
		List<CartItemDto> items = cart.getItems().stream()
			.map(CartItemDto::from)
			.toList();
		
		BigDecimal total = items.stream()
			.map(CartItemDto::total)
			.reduce(BigDecimal.ZERO, BigDecimal::add);
		
		return new CartDto(cart.getSessionToken(), items, total, items.size());
	}
}