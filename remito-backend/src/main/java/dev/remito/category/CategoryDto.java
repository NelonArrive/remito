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
	static CategoryDto from(Category c) {
		return new CategoryDto(
			c.getId(), c.getName(), c.getSlug(), c.getDescription(),
			c.getParent() != null ? c.getParent().getId() : null,
			c.getParent() != null ? c.getParent().getName() : null,
			c.isActive()
		);
	}
}