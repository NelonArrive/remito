package dev.remito.category;

import dev.remito.exception.AlreadyExistsException;
import dev.remito.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
	
	private final CategoryRepository categoryRepository;
	
	public List<CategoryDto> findAll() {
		return categoryRepository.findAll().stream()
			.filter(Category::isActive)
			.map(CategoryDto::from)
			.toList();
	}
	
	public CategoryDto findById(Long id) {
		return categoryRepository.findById(id)
			.map(CategoryDto::from)
			.orElseThrow(() -> new ResourceNotFoundException("Category not found: " + id));
	}
	
	@Transactional
	public CategoryDto create(CategoryRequest request) {
		if (categoryRepository.existsBySlug(request.slug())) {
			throw new AlreadyExistsException("Slug already exists: " + request.slug());
		}
		
		Category category = Category.builder()
			.name(request.name())
			.slug(request.slug())
			.description(request.description())
			.parent(resolveParent(request.parentId()))
			.build();
		
		return CategoryDto.from(categoryRepository.save(category));
	}
	
	@Transactional
	public CategoryDto update(Long id, CategoryRequest request) {
		Category category = categoryRepository.findById(id)
			.orElseThrow(() -> new ResourceNotFoundException("Category not found: " + id));
		
		if (!category.getSlug().equals(request.slug()) && categoryRepository.existsBySlug(request.slug())) {
			throw new AlreadyExistsException("Slug already exists: " + request.slug());
		}
		
		category.setName(request.name());
		category.setSlug(request.slug());
		category.setDescription(request.description());
		category.setParent(resolveParent(request.parentId()));
		
		return CategoryDto.from(categoryRepository.save(category));
	}
	
	@Transactional
	public void delete(Long id) {
		Category category = categoryRepository.findById(id)
			.orElseThrow(() -> new ResourceNotFoundException("Category not found: " + id));
		category.setActive(false);
		categoryRepository.save(category);
	}
	
	private Category resolveParent(Long parentId) {
		if (parentId == null) return null;
		return categoryRepository.findById(parentId)
			.orElseThrow(() -> new ResourceNotFoundException("Parent category not found: " + parentId));
	}
}