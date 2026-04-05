package dev.remito.order;

import dev.remito.cart.Cart;
import dev.remito.cart.CartItem;
import dev.remito.cart.CartService;
import dev.remito.exception.ResourceNotFoundException;
import dev.remito.product.Product;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {
	
	@Mock
	OrderRepository orderRepository;
	@Mock
	CartService cartService;
	@Mock
	OrderNotificationService notificationService;
	@Mock
	OrderMapper orderMapper;
	
	@InjectMocks
	OrderService orderService;
	
	private static final String TOKEN = "test-session-token";
	
	private Product product;
	private Cart cart;
	private CartItem cartItem;
	private Order order;
	private OrderDto orderDto;
	private OrderRequest orderRequest;
	
	@BeforeEach
	void setUp() {
		product = Product.builder()
			.id(1L).name("Canon 057").price(new BigDecimal("3200")).build();
		
		cartItem = CartItem.builder()
			.id(1L).product(product).quantity(2)
			.priceSnapshot(new BigDecimal("3200")).build();
		
		cart = Cart.builder()
			.id(1L).sessionToken(TOKEN)
			.items(new ArrayList<>(List.of(cartItem))).build();
		
		order = Order.builder()
			.id(1L).orderNumber("RM-00001")
			.customerName("Иван").customerEmail("ivan@mail.ru")
			.customerPhone("+79001234567")
			.payerType(PayerType.INDIVIDUAL).paymentMethod(PaymentMethod.CASH)
			.totalAmount(new BigDecimal("6400"))
			.status(OrderStatus.NEW).items(new ArrayList<>()).build();
		
		orderDto = new OrderDto(
			1L, "RM-00001", "Иван", "ivan@mail.ru", "+79001234567",
			"INDIVIDUAL", "CASH", null, null, null,
			"NEW", new BigDecimal("6400"), List.of(), null
		);
		
		orderRequest = new OrderRequest(
			"Иван", "ivan@mail.ru", "+79001234567",
			PayerType.INDIVIDUAL, PaymentMethod.CASH, null, null, null
		);
	}
	
	@Test
	@DisplayName("checkout —  create order, clear cart, sends notification")
	void checkout_createsOrder_clearsCart_sendsNotification() {
		when(cartService.getCartByToken(TOKEN)).thenReturn(cart);
		when(orderRepository.findMaxId()).thenReturn(0L);
		when(orderRepository.save(any(Order.class))).thenReturn(order);
		when(orderMapper.toDto(order)).thenReturn(orderDto);
		
		OrderDto result = orderService.checkout(TOKEN, orderRequest);
		
		assertThat(result.orderNumber()).isEqualTo("RM-00001");
		assertThat(result.totalAmount()).isEqualTo(new BigDecimal("6400"));
		verify(orderRepository).save(any(Order.class));
		verify(cartService).clear(TOKEN);
		verify(notificationService).sendOrderNotification(order);
	}
	
	@Test
	@DisplayName("checkout —  calculates total correctly (price * quantity)")
	void checkout_calculatesTotalCorrectly() {
		Product product2 = Product.builder()
			.id(2L).name("HP 85A").price(new BigDecimal("1500")).build();
		CartItem cartItem2 = CartItem.builder()
			.id(2L).product(product2).quantity(1)
			.priceSnapshot(new BigDecimal("1500")).build();
		cart.getItems().add(cartItem2);
		
		when(cartService.getCartByToken(TOKEN)).thenReturn(cart);
		when(orderRepository.findMaxId()).thenReturn(0L);
		when(orderRepository.save(any(Order.class))).thenAnswer(inv -> {
			Order saved = inv.getArgument(0);
			// 3200*2 + 1500*1 = 7900
			assertThat(saved.getTotalAmount()).isEqualTo(new BigDecimal("7900"));
			return order;
		});
		when(orderMapper.toDto(order)).thenReturn(orderDto);
		
		orderService.checkout(TOKEN, orderRequest);
	}
	
	@Test
	@DisplayName("checkout —  throws IllegalStateException when cart empty")
	void checkout_throwsIllegalState_whenCartEmpty() {
		cart.getItems().clear();
		when(cartService.getCartByToken(TOKEN)).thenReturn(cart);
		
		assertThatThrownBy(() -> orderService.checkout(TOKEN, orderRequest))
			.isInstanceOf(IllegalStateException.class)
			.hasMessageContaining("Cart is empty");
		
		verify(orderRepository, never()).save(any());
		verify(notificationService, never()).sendOrderNotification(any());
	}
	
	@Test
	@DisplayName("checkout —  throws ResourceNotFoundException when cart missing")
	void checkout_throwsNotFound_whenCartMissing() {
		when(cartService.getCartByToken(TOKEN))
			.thenThrow(new ResourceNotFoundException("Cart not found"));
		
		assertThatThrownBy(() -> orderService.checkout(TOKEN, orderRequest))
			.isInstanceOf(ResourceNotFoundException.class);
		
		verify(orderRepository, never()).save(any());
	}
	
	@Test
	@DisplayName("checkout —  generates correct order number")
	void checkout_generatesCorrectOrderNumber() {
		when(cartService.getCartByToken(TOKEN)).thenReturn(cart);
		when(orderRepository.findMaxId()).thenReturn(4L);
		when(orderRepository.save(any(Order.class))).thenAnswer(inv -> {
			Order saved = inv.getArgument(0);
			assertThat(saved.getOrderNumber()).isEqualTo("RM-00005");
			return order;
		});
		when(orderMapper.toDto(order)).thenReturn(orderDto);
		
		orderService.checkout(TOKEN, orderRequest);
	}
	
	@Test
	@DisplayName("findAll —  returns list")
	void findAll_returnsList() {
		when(orderRepository.findAllByOrderByCreatedAtDesc()).thenReturn(List.of(order));
		when(orderMapper.toDto(order)).thenReturn(orderDto);
		
		List<OrderDto> result = orderService.findAll();
		
		assertThat(result).hasSize(1);
		assertThat(result.getFirst().orderNumber()).isEqualTo("RM-00001");
	}
	
	@Test
	@DisplayName("findAll —  returns empty when no orders")
	void findAll_returnsEmpty_whenNoOrders() {
		when(orderRepository.findAllByOrderByCreatedAtDesc()).thenReturn(List.of());
		
		assertThat(orderService.findAll()).isEmpty();
	}
	
	@Test
	@DisplayName("findByOrderNumber —  returns order")
	void findByOrderNumber_returnsOrder() {
		when(orderRepository.findByOrderNumber("RM-00001")).thenReturn(Optional.of(order));
		when(orderMapper.toDto(order)).thenReturn(orderDto);
		
		assertThat(orderService.findByOrderNumber("RM-00001").orderNumber()).isEqualTo("RM-00001");
	}
	
	@Test
	@DisplayName("findByOrderNumber —  throws ResourceNotFoundException when missing")
	void findByOrderNumber_throwsNotFound_whenMissing() {
		when(orderRepository.findByOrderNumber("RM-99999")).thenReturn(Optional.empty());
		
		assertThatThrownBy(() -> orderService.findByOrderNumber("RM-99999"))
			.isInstanceOf(ResourceNotFoundException.class)
			.hasMessageContaining("RM-99999");
	}
	
	@Test
	@DisplayName("updateStatus —  change order status")
	void updateStatus_changesStatus() {
		when(orderRepository.findById(1L)).thenReturn(Optional.of(order));
		when(orderRepository.save(order)).thenReturn(order);
		when(orderMapper.toDto(order)).thenReturn(orderDto);
		
		orderService.updateStatus(1L, OrderStatus.CONFIRMED);
		
		assertThat(order.getStatus()).isEqualTo(OrderStatus.CONFIRMED);
		verify(orderRepository).save(order);
	}
	
	@Test
	@DisplayName("updateStatus —  throws ResourceNotFoundException when missing")
	void updateStatus_throwsNotFound_whenMissing() {
		when(orderRepository.findById(99L)).thenReturn(Optional.empty());
		
		assertThatThrownBy(() -> orderService.updateStatus(99L, OrderStatus.CONFIRMED))
			.isInstanceOf(ResourceNotFoundException.class)
			.hasMessageContaining("99");
		
		verify(orderRepository, never()).save(any());
	}
}