package dev.remito.cart;

import dev.remito.exception.ResourceNotFoundException;
import dev.remito.product.Product;
import dev.remito.product.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CartService {
	
	private final CartRepository cartRepository;
	private final CartItemRepository cartItemRepository;
	private final ProductRepository productRepository;
	
	public CartDto getOrCreate(String sessionToken) {
		Cart cart = findOrCreate(sessionToken);
		return CartDto.from(cart);
	}
	
	@Transactional
	public CartDto addItem(String sessionToken, AddToCartRequest request) {
		Cart cart = findOrCreate(sessionToken);
		
		Product product = productRepository.findById(request.productId())
			.orElseThrow(() -> new ResourceNotFoundException("Product not found: " + request.productId()));
		
		// Если товар уже есть — увеличиваем количество
		cart.getItems().stream()
			.filter(i -> i.getProduct().getId().equals(request.productId()))
			.findFirst()
			.ifPresentOrElse(
				existing -> existing.setQuantity(existing.getQuantity() + request.quantity()),
				() -> cart.getItems().add(
					CartItem.builder()
						.cart(cart)
						.product(product)
						.quantity(request.quantity())
						.priceSnapshot(product.getPrice())
						.build()
				)
			);
		
		return CartDto.from(cartRepository.save(cart));
	}
	
	@Transactional
	public CartDto updateItem(String sessionToken, Long itemId, UpdateCartItemRequest request) {
		Cart cart = getCartByToken(sessionToken);
		
		CartItem item = cart.getItems().stream()
			.filter(i -> i.getId().equals(itemId))
			.findFirst()
			.orElseThrow(() -> new ResourceNotFoundException("Cart item not found: " + itemId));
		
		item.setQuantity(request.quantity());
		return CartDto.from(cartRepository.save(cart));
	}
	
	@Transactional
	public CartDto removeItem(String sessionToken, Long itemId) {
		Cart cart = getCartByToken(sessionToken);
		cart.getItems().removeIf(i -> i.getId().equals(itemId));
		return CartDto.from(cartRepository.save(cart));
	}
	
	@Transactional
	public void clear(String sessionToken) {
		cartRepository.findBySessionToken(sessionToken).ifPresent(cart -> {
			cart.getItems().clear();
			cartRepository.save(cart);
		});
	}
	
	public Cart getCartByToken(String token) {
		return cartRepository.findBySessionToken(token)
			.orElseThrow(() -> new ResourceNotFoundException("Cart not found"));
	}
	
	private Cart findOrCreate(String token) {
		return cartRepository.findBySessionToken(token)
			.orElseGet(() -> cartRepository.save(
				Cart.builder()
					.sessionToken(token != null ? token : UUID.randomUUID().toString())
					.build()
			));
	}
	
	public static String generateToken() {
		return UUID.randomUUID().toString();
	}
}
