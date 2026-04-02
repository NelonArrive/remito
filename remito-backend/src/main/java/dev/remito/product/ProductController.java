package dev.remito.product;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("${api.prefix}/products")
@RequiredArgsConstructor
public class ProductController {
	
	private final ProductService productService;
	
	@GetMapping
	public ResponseEntity<Page<ProductDto>> getAll(
		@RequestParam(required = false) Long categoryId,
		@RequestParam(required = false) Long brandId,
		@RequestParam(required = false) Long colorId,
		@RequestParam(required = false) BigDecimal priceFrom,
		@RequestParam(required = false) BigDecimal priceTo,
		@RequestParam(required = false) Boolean inStock,
		@RequestParam(defaultValue = "createdAt") String sortBy,
		@RequestParam(defaultValue = "desc") String sortDir,
		@RequestParam(defaultValue = "0") int page,
		@RequestParam(defaultValue = "20") int size
	) {
		var filter = new ProductFilter(
			categoryId, brandId, colorId,
			priceFrom, priceTo, inStock,
			sortBy, sortDir, page, size
		);
		return ResponseEntity.ok(productService.findAll(filter));
	}
	
	@GetMapping("/{slug}")
	public ResponseEntity<ProductDto> getBySlug(@PathVariable String slug) {
		return ResponseEntity.ok(productService.findBySlug(slug));
	}
	
	@PostMapping
	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
	public ResponseEntity<ProductDto> create(@Valid @RequestBody ProductRequest request) {
		return ResponseEntity.status(HttpStatus.CREATED).body(productService.create(request));
	}
	
	@PutMapping("/{id}")
	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
	public ResponseEntity<ProductDto> update(
		@PathVariable Long id,
		@Valid @RequestBody ProductRequest request
	) {
		return ResponseEntity.ok(productService.update(id, request));
	}
	
	@DeleteMapping("/{id}")
	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		productService.delete(id);
		return ResponseEntity.noContent().build();
	}
}
