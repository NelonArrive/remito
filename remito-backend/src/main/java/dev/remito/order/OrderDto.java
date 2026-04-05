package dev.remito.order;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record OrderDto(
	Long id,
	String orderNumber,
	String customerName,
	String customerEmail,
	String customerPhone,
	String payerType,
	String paymentMethod,
	String comment,
	String pickupPoint,
	String address,
	String status,
	BigDecimal totalAmount,
	List<OrderItemDto> items,
	LocalDateTime createdAt
) {
}