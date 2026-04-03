package dev.remito.article;

import java.time.LocalDateTime;

public record ArticleDto(
	Long id,
	String title,
	String slug,
	String content,
	String previewText,
	String coverImage,
	String authorName,
	boolean isPublished,
	LocalDateTime publishedAt,
	LocalDateTime createdAt
) {
	static ArticleDto from(Article a) {
		return new ArticleDto(
			a.getId(), a.getTitle(), a.getSlug(),
			a.getContent(), a.getPreviewText(), a.getCoverImage(),
			a.getAuthor() != null ? a.getAuthor().getName() : null,
			a.isPublished(), a.getPublishedAt(), a.getCreatedAt()
		);
	}
}