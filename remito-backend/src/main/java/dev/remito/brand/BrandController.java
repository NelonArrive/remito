package dev.remito.brand;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/brands")
@RequiredArgsConstructor
public class BrandController {
	
	private final BrandService brandService;
	
	@GetMapping
	public ResponseEntity<List<BrandDto>> getAll() {
		return ResponseEntity.ok(brandService.findAll());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<BrandDto> getById(@PathVariable Long id) {
		return ResponseEntity.ok(brandService.findById(id));
	}
	
	@PostMapping
	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
	public ResponseEntity<BrandDto> create(@Valid @RequestBody BrandRequest request) {
		return ResponseEntity.status(HttpStatus.CREATED).body(brandService.create(request));
	}
	
	@PutMapping("/{id}")
	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
	public ResponseEntity<BrandDto> update(
		@PathVariable Long id,
		@Valid @RequestBody BrandRequest request
	) {
		return ResponseEntity.ok(brandService.update(id, request));
	}
	
	@DeleteMapping("/{id}")
	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		brandService.delete(id);
		return ResponseEntity.noContent().build();
	}
}