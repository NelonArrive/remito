package dev.remito.cart;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Optional;

@RestController
@RequestMapping("${api.prefix}/cart")
@RequiredArgsConstructor
public class CartController {
	
	private final CartService cartService;
	
	private static final String CART_COOKIE = "cart_token";
	private static final int COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 дней
	
	@GetMapping
	public ResponseEntity<CartDto> getCart(
		HttpServletRequest request,
		HttpServletResponse response
	) {
		String token = resolveToken(request, response);
		return ResponseEntity.ok(cartService.getOrCreate(token));
	}
	
	@PostMapping("/items")
	public ResponseEntity<CartDto> addItem(
		@Valid @RequestBody AddToCartRequest body,
		HttpServletRequest request,
		HttpServletResponse response
	) {
		String token = resolveToken(request, response);
		return ResponseEntity.ok(cartService.addItem(token, body));
	}
	
	@PutMapping("/items/{itemId}")
	public ResponseEntity<CartDto> updateItem(
		@PathVariable Long itemId,
		@Valid @RequestBody UpdateCartItemRequest body,
		HttpServletRequest request,
		HttpServletResponse response
	) {
		String token = resolveToken(request, response);
		return ResponseEntity.ok(cartService.updateItem(token, itemId, body));
	}
	
	@DeleteMapping("/items/{itemId}")
	public ResponseEntity<CartDto> removeItem(
		@PathVariable Long itemId,
		HttpServletRequest request,
		HttpServletResponse response
	) {
		String token = resolveToken(request, response);
		return ResponseEntity.ok(cartService.removeItem(token, itemId));
	}
	
	@DeleteMapping
	public ResponseEntity<Void> clearCart(
		HttpServletRequest request,
		HttpServletResponse response
	) {
		String token = resolveToken(request, response);
		cartService.clear(token);
		return ResponseEntity.noContent().build();
	}
	
	private String resolveToken(HttpServletRequest request, HttpServletResponse response) {
		Optional<String> existing = Arrays.stream(
				request.getCookies() != null ? request.getCookies() : new Cookie[0])
			.filter(c -> CART_COOKIE.equals(c.getName()))
			.map(Cookie::getValue)
			.findFirst();
		
		if (existing.isPresent()) return existing.get();
		
		String newToken = CartService.generateToken();
		Cookie cookie = new Cookie(CART_COOKIE, newToken);
		cookie.setPath("/");
		cookie.setHttpOnly(true);
		cookie.setMaxAge(COOKIE_MAX_AGE);
		response.addCookie(cookie);
		return newToken;
	}
}