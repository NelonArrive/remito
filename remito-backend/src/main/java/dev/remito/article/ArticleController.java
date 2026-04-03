package dev.remito.article;

import dev.remito.user.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/articles")
@RequiredArgsConstructor
public class ArticleController {
	
	private final ArticleService articleService;
	
	@GetMapping
	public ResponseEntity<Page<ArticleDto>> getAll(
		@RequestParam(defaultValue = "0") int page,
		@RequestParam(defaultValue = "10") int size
	) {
		return ResponseEntity.ok(articleService.findPublished(page, size));
	}
	
	@GetMapping("/{slug}")
	public ResponseEntity<ArticleDto> getBySlug(@PathVariable String slug) {
		return ResponseEntity.ok(articleService.findBySlug(slug));
	}
	
	@PostMapping
	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
	public ResponseEntity<ArticleDto> create(
		@Valid @RequestBody ArticleRequest request,
		@AuthenticationPrincipal User currentUser
	) {
		return ResponseEntity.status(HttpStatus.CREATED)
			.body(articleService.create(request, currentUser.getId()));
	}
	
	@PutMapping("/{id}")
	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
	public ResponseEntity<ArticleDto> update(
		@PathVariable Long id,
		@Valid @RequestBody ArticleRequest request
	) {
		return ResponseEntity.ok(articleService.update(id, request));
	}
	
	@DeleteMapping("/{id}")
	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		articleService.delete(id);
		return ResponseEntity.noContent().build();
	}
}