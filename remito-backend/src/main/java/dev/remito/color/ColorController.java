package dev.remito.color;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/colors")
@RequiredArgsConstructor
public class ColorController {
	
	private final ColorService colorService;
	
	@GetMapping
	public ResponseEntity<List<ColorDto>> getAll() {
		return ResponseEntity.ok(colorService.findAll());
	}
	
	@PostMapping
	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
	public ResponseEntity<ColorDto> create(@Valid @RequestBody ColorRequest request) {
		return ResponseEntity.status(HttpStatus.CREATED).body(colorService.create(request));
	}
	
	@PutMapping("/{id}")
	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
	public ResponseEntity<ColorDto> update(
		@PathVariable Long id,
		@Valid @RequestBody ColorRequest request
	) {
		return ResponseEntity.ok(colorService.update(id, request));
	}
	
	@DeleteMapping("/{id}")
	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		colorService.delete(id);
		return ResponseEntity.noContent().build();
	}
}
