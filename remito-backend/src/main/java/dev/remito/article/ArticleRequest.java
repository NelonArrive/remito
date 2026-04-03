package dev.remito.article;

import jakarta.validation.constraints.NotBlank;

public record ArticleRequest(
	@NotBlank String title,
	@NotBlank String slug,
	@NotBlank String content,
	String previewText,
	String coverImage,
	boolean publish
) {
}