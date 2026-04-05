package dev.remito.order;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("${api.prefix}/orders")
@RequiredArgsConstructor
public class OrderController {
	
	private final OrderService orderService;
	
	@PostMapping
	public ResponseEntity<OrderDto> checkout(
		@Valid @RequestBody OrderRequest request,
		HttpServletRequest httpRequest
	) {
		String token = resolveCartToken(httpRequest);
		return ResponseEntity.status(HttpStatus.CREATED)
			.body(orderService.checkout(token, request));
	}
	
	@GetMapping
	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
	public ResponseEntity<List<OrderDto>> getAll() {
		return ResponseEntity.ok(orderService.findAll());
	}
	
	@GetMapping("/{orderNumber}")
	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
	public ResponseEntity<OrderDto> getByNumber(@PathVariable String orderNumber) {
		return ResponseEntity.ok(orderService.findByOrderNumber(orderNumber));
	}
	
	@PatchMapping("/{id}/status")
	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
	public ResponseEntity<OrderDto> updateStatus(
		@PathVariable Long id,
		@RequestParam OrderStatus status
	) {
		return ResponseEntity.ok(orderService.updateStatus(id, status));
	}
	
	private String resolveCartToken(HttpServletRequest request) {
		if (request.getCookies() == null) return null;
		return Arrays.stream(request.getCookies())
			.filter(c -> "cart_token".equals(c.getName()))
			.map(Cookie::getValue)
			.findFirst()
			.orElse(null);
	}
}