package dev.remito.cart;

import dev.remito.exception.ResourceNotFoundException;
import dev.remito.product.Product;
import dev.remito.product.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class CartServiceTest {
	
	@Mock
	CartRepository cartRepository;
	@Mock
	CartItemRepository cartItemRepository;
	@Mock
	ProductRepository productRepository;
	@Mock
	CartMapper cartMapper;
	
	@InjectMocks
	CartService cartService;
	
	private static final String TOKEN = "test-session-token";
	
	private Product product;
	private Cart cart;
	private CartDto cartDto;
	
	@BeforeEach
	void setUp() {
		product = Product.builder()
			.id(1L)
			.name("Canon 057")
			.price(new BigDecimal("3200"))
			.isActive(true)
			.build();
		
		cart = Cart.builder()
			.id(1L)
			.sessionToken(TOKEN)
			.items(new ArrayList<>())
			.build();
		
		cartDto = new CartDto(TOKEN, java.util.List.of(), BigDecimal.ZERO, 0);
	}
	
	@Test
	@DisplayName("getOrCreate —  returns existing cart")
	void getOrCreate_returnsExistingCart() {
		when(cartRepository.findBySessionToken(TOKEN)).thenReturn(Optional.of(cart));
		when(cartMapper.toDto(cart)).thenReturn(cartDto);
		
		CartDto result = cartService.getOrCreate(TOKEN);
		
		assertThat(result.sessionToken()).isEqualTo(TOKEN);
		verify(cartRepository, never()).save(any());
	}
	
	@Test
	@DisplayName("getOrCreate —  creates new cart when not found")
	void getOrCreate_createsNewCart_whenNotFound() {
		when(cartRepository.findBySessionToken(TOKEN)).thenReturn(Optional.empty());
		when(cartRepository.save(any(Cart.class))).thenReturn(cart);
		when(cartMapper.toDto(cart)).thenReturn(cartDto);
		
		CartDto result = cartService.getOrCreate(TOKEN);
		
		assertThat(result).isNotNull();
		verify(cartRepository).save(any(Cart.class));
	}
	
	@Test
	@DisplayName("addItem —  adds new item in cart")
	void addItem_addsNewItem() {
		var request = new AddToCartRequest(1L, 2);
		
		when(cartRepository.findBySessionToken(TOKEN)).thenReturn(Optional.of(cart));
		when(productRepository.findById(1L)).thenReturn(Optional.of(product));
		when(cartRepository.save(cart)).thenReturn(cart);
		when(cartMapper.toDto(cart)).thenReturn(cartDto);
		
		cartService.addItem(TOKEN, request);
		
		assertThat(cart.getItems()).hasSize(1);
		assertThat(cart.getItems().getFirst().getQuantity()).isEqualTo(2);
		assertThat(cart.getItems().getFirst().getPriceSnapshot()).isEqualTo(new BigDecimal("3200"));
	}
	
	@Test
	@DisplayName("addItem —  increases quantity when item already exists")
	void addItem_increasesQuantity_whenItemAlreadyExists() {
		CartItem existing = CartItem.builder()
			.id(1L)
			.cart(cart)
			.product(product)
			.quantity(1)
			.priceSnapshot(new BigDecimal("3200"))
			.build();
		cart.getItems().add(existing);
		
		var request = new AddToCartRequest(1L, 3);
		
		when(cartRepository.findBySessionToken(TOKEN)).thenReturn(Optional.of(cart));
		when(productRepository.findById(1L)).thenReturn(Optional.of(product));
		when(cartRepository.save(cart)).thenReturn(cart);
		when(cartMapper.toDto(cart)).thenReturn(cartDto);
		
		cartService.addItem(TOKEN, request);
		
		assertThat(cart.getItems()).hasSize(1);
		assertThat(cart.getItems().getFirst().getQuantity()).isEqualTo(4);
	}
	
	@Test
	@DisplayName("addItem —  throws ResourceNotFoundException when product missing")
	void addItem_throwsNotFound_whenProductMissing() {
		var request = new AddToCartRequest(99L, 1);
		
		when(cartRepository.findBySessionToken(TOKEN)).thenReturn(Optional.of(cart));
		when(productRepository.findById(99L)).thenReturn(Optional.empty());
		
		assertThatThrownBy(() -> cartService.addItem(TOKEN, request))
			.isInstanceOf(ResourceNotFoundException.class)
			.hasMessageContaining("99");
		
		verify(cartRepository, never()).save(any());
	}
	
	@Test
	@DisplayName("updateItem —  updates quantity")
	void updateItem_updatesQuantity() {
		CartItem item = CartItem.builder()
			.id(1L)
			.cart(cart)
			.product(product)
			.quantity(1)
			.priceSnapshot(new BigDecimal("3200"))
			.build();
		cart.getItems().add(item);
		
		var request = new UpdateCartItemRequest(5);
		
		when(cartRepository.findBySessionToken(TOKEN)).thenReturn(Optional.of(cart));
		when(cartRepository.save(cart)).thenReturn(cart);
		when(cartMapper.toDto(cart)).thenReturn(cartDto);
		
		cartService.updateItem(TOKEN, 1L, request);
		
		assertThat(item.getQuantity()).isEqualTo(5);
		verify(cartRepository).save(cart);
	}
	
	@Test
	@DisplayName("updateItem —  throws ResourceNotFoundException when item missing")
	void updateItem_throwsNotFound_whenItemMissing() {
		when(cartRepository.findBySessionToken(TOKEN)).thenReturn(Optional.of(cart));
		
		assertThatThrownBy(() -> cartService.updateItem(TOKEN, 99L, new UpdateCartItemRequest(2)))
			.isInstanceOf(ResourceNotFoundException.class)
			.hasMessageContaining("99");
	}
	
	@Test
	@DisplayName("removeItem —  removes item of cart")
	void removeItem_removesItem() {
		CartItem item = CartItem.builder()
			.id(1L)
			.cart(cart)
			.product(product)
			.quantity(1)
			.priceSnapshot(new BigDecimal("3200"))
			.build();
		cart.getItems().add(item);
		
		when(cartRepository.findBySessionToken(TOKEN)).thenReturn(Optional.of(cart));
		when(cartRepository.save(cart)).thenReturn(cart);
		when(cartMapper.toDto(cart)).thenReturn(cartDto);
		
		cartService.removeItem(TOKEN, 1L);
		
		assertThat(cart.getItems()).isEmpty();
		verify(cartRepository).save(cart);
	}
	
	@Test
	@DisplayName("clear —  removes all items")
	void clear_removesAllItems() {
		CartItem item = CartItem.builder()
			.id(1L).cart(cart).product(product)
			.quantity(2).priceSnapshot(new BigDecimal("3200"))
			.build();
		cart.getItems().add(item);
		
		when(cartRepository.findBySessionToken(TOKEN)).thenReturn(Optional.of(cart));
		
		cartService.clear(TOKEN);
		
		assertThat(cart.getItems()).isEmpty();
		verify(cartRepository).save(cart);
	}
	
	@Test
	@DisplayName("clear —  does nothing when cart not found")
	void clear_doesNothing_whenCartNotFound() {
		when(cartRepository.findBySessionToken(TOKEN)).thenReturn(Optional.empty());
		
		assertThatNoException().isThrownBy(() -> cartService.clear(TOKEN));
		verify(cartRepository, never()).save(any());
	}
	
	@Test
	@DisplayName("getCartByToken —  throws ResourceNotFoundException when missing")
	void getCartByToken_throwsNotFound_whenMissing() {
		when(cartRepository.findBySessionToken("unknown")).thenReturn(Optional.empty());
		
		assertThatThrownBy(() -> cartService.getCartByToken("unknown"))
			.isInstanceOf(ResourceNotFoundException.class)
			.hasMessageContaining("Cart not found");
	}
}
