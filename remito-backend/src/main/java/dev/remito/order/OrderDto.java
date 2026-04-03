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
	static OrderDto from(Order order) {
		return new OrderDto(
			order.getId(),
			order.getOrderNumber(),
			order.getCustomerName(),
			order.getCustomerEmail(),
			order.getCustomerPhone(),
			order.getPayerType().name(),
			order.getPaymentMethod().name(),
			order.getComment(),
			order.getPickupPoint(),
			order.getAddress(),
			order.getStatus().name(),
			order.getTotalAmount(),
			order.getItems().stream().map(OrderItemDto::from).toList(),
			order.getCreatedAt()
		);
	}
}