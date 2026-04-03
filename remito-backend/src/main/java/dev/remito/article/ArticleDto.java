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
}