package dev.remito.category;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/categories")
@RequiredArgsConstructor
public class CategoryController {
	
	private final CategoryService categoryService;
	
	@GetMapping
	public ResponseEntity<List<CategoryDto>> getAll() {
		return ResponseEntity.ok(categoryService.findAll());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<CategoryDto> getById(@PathVariable Long id) {
		return ResponseEntity.ok(categoryService.findById(id));
	}
	
	@PostMapping
	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
	public ResponseEntity<CategoryDto> create(@Valid @RequestBody CategoryRequest request) {
		return ResponseEntity.status(HttpStatus.CREATED).body(categoryService.create(request));
	}
	
	@PutMapping("/{id}")
	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
	public ResponseEntity<CategoryDto> update(
		@PathVariable Long id,
		@Valid @RequestBody CategoryRequest request
	) {
		return ResponseEntity.ok(categoryService.update(id, request));
	}
	
	@DeleteMapping("/{id}")
	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		categoryService.delete(id);
		return ResponseEntity.noContent().build();
	}
}
