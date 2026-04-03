package dev.remito.order;

import dev.remito.cart.Cart;
import dev.remito.cart.CartService;
import dev.remito.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {
	
	private final OrderRepository orderRepository;
	private final CartService cartService;
	private final OrderNotificationService notificationService;
	private final OrderMapper orderMapper;
	
	@Transactional
	public OrderDto checkout(String sessionToken, OrderRequest request) {
		Cart cart = cartService.getCartByToken(sessionToken);
		
		if (cart.getItems().isEmpty()) {
			throw new IllegalStateException("Cart is empty");
		}
		
		BigDecimal total = cart.getItems().stream()
			.map(i -> i.getPriceSnapshot().multiply(BigDecimal.valueOf(i.getQuantity())))
			.reduce(BigDecimal.ZERO, BigDecimal::add);
		
		Order order = Order.builder()
			.orderNumber(generateOrderNumber())
			.customerName(request.customerName())
			.customerEmail(request.customerEmail())
			.customerPhone(request.customerPhone())
			.payerType(request.payerType())
			.paymentMethod(request.paymentMethod())
			.comment(request.comment())
			.pickupPoint(request.pickupPoint())
			.address(request.address())
			.totalAmount(total)
			.build();
		
		cart.getItems().forEach(cartItem ->
			order.getItems().add(
				OrderItem.builder()
					.order(order)
					.product(cartItem.getProduct())
					.nameSnapshot(cartItem.getProduct().getName())
					.priceSnapshot(cartItem.getPriceSnapshot())
					.quantity(cartItem.getQuantity())
					.build()
			)
		);
		
		Order saved = orderRepository.save(order);
		
		cartService.clear(sessionToken);
		
		notificationService.sendOrderNotification(saved);
		
		return orderMapper.toDto(saved);
	}
	
	public List<OrderDto> findAll() {
		return orderRepository.findAllByOrderByCreatedAtDesc()
			.stream().map(orderMapper::toDto).toList();
	}
	
	public OrderDto findByOrderNumber(String orderNumber) {
		return orderRepository.findByOrderNumber(orderNumber)
			.map(orderMapper::toDto)
			.orElseThrow(() -> new ResourceNotFoundException("Order not found: " + orderNumber));
	}
	
	@Transactional
	public OrderDto updateStatus(Long id, OrderStatus status) {
		Order order = orderRepository.findById(id)
			.orElseThrow(() -> new ResourceNotFoundException("Order not found: " + id));
		order.setStatus(status);
		Order saved = orderRepository.save(order);
		return orderMapper.toDto(saved);
	}
	
	private String generateOrderNumber() {
		long next = orderRepository.findMaxId() + 1;
		return String.format("RM-%05d", next);
	}
}