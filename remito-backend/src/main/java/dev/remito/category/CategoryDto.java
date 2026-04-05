package dev.remito.category;

public record CategoryDto(
	Long id,
	String name,
	String slug,
	String description,
	Long parentId,
	String parentName,
	boolean isActive
) {
}