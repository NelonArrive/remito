package dev.remito.article;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ArticleRepository extends JpaRepository<Article, Long> {
	Page<Article> findAllByIsPublishedTrue(PageRequest pageable);
	
	Optional<Article> findBySlug(String slug);
	
	boolean existsBySlug(String slug);
}
