package dev.remito.article;

import dev.remito.exception.AlreadyExistsException;
import dev.remito.exception.ResourceNotFoundException;
import dev.remito.user.User;
import dev.remito.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ArticleService {
	
	private final ArticleRepository articleRepository;
	private final UserRepository userRepository;
	
	public Page<ArticleDto> findPublished(int page, int size) {
		return articleRepository.findAllByIsPublishedTrue(
			PageRequest.of(page, size, Sort.by("publishedAt").descending())
		).map(ArticleDto::from);
	}
	
	public ArticleDto findBySlug(String slug) {
		return articleRepository.findBySlug(slug)
			.map(ArticleDto::from)
			.orElseThrow(() -> new ResourceNotFoundException("Article not found: " + slug));
	}
	
	@Transactional
	public ArticleDto create(ArticleRequest request, Long authorId) {
		if (articleRepository.existsBySlug(request.slug())) {
			throw new AlreadyExistsException("Slug already exists: " + request.slug());
		}
		
		User author = userRepository.findById(authorId)
			.orElseThrow(() -> new ResourceNotFoundException("User not found: " + authorId));
		
		Article article = Article.builder()
			.title(request.title())
			.slug(request.slug())
			.content(request.content())
			.previewText(request.previewText())
			.coverImage(request.coverImage())
			.author(author)
			.isPublished(request.publish())
			.publishedAt(request.publish() ? LocalDateTime.now() : null)
			.build();
		
		return ArticleDto.from(articleRepository.save(article));
	}
	
	@Transactional
	public ArticleDto update(Long id, ArticleRequest request) {
		Article article = articleRepository.findById(id)
			.orElseThrow(() -> new ResourceNotFoundException("Article not found: " + id));
		
		if (!article.getSlug().equals(request.slug()) && articleRepository.existsBySlug(request.slug())) {
			throw new AlreadyExistsException("Slug already exists: " + request.slug());
		}
		
		article.setTitle(request.title());
		article.setSlug(request.slug());
		article.setContent(request.content());
		article.setPreviewText(request.previewText());
		article.setCoverImage(request.coverImage());
		
		if (request.publish() && !article.isPublished()) {
			article.setPublished(true);
			article.setPublishedAt(LocalDateTime.now());
		}
		
		return ArticleDto.from(articleRepository.save(article));
	}
	
	@Transactional
	public void delete(Long id) {
		if (!articleRepository.existsById(id)) {
			throw new ResourceNotFoundException("Article not found: " + id);
		}
		articleRepository.deleteById(id);
	}
}
