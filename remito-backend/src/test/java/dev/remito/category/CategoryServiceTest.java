package dev.remito.category;

import dev.remito.exception.AlreadyExistsException;
import dev.remito.exception.ResourceNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CategoryServiceTest {
	
	@Mock
	CategoryRepository categoryRepository;
	@Mock
	CategoryMapper categoryMapper;
	
	@InjectMocks
	CategoryService categoryService;
	
	private Category parent;
	private Category category;
	private CategoryDto categoryDto;
	
	@BeforeEach
	void setUp() {
		parent = Category.builder()
			.id(1L).name("Товары").slug("tovary").isActive(true).build();
		
		category = Category.builder()
			.id(2L).name("Картриджи").slug("kartridzhi")
			.parent(parent).isActive(true).build();
		
		categoryDto = new CategoryDto(
			2L, "Картриджи", "kartridzhi", null,
			1L, "Товары", true
		);
	}
	
	@Test
	@DisplayName("findAll —  returns only active category")
	void findAll_returnsOnlyActive() {
		Category inactive = Category.builder()
			.id(3L).name("Удалённая").slug("deleted").isActive(false).build();
		
		when(categoryRepository.findAll()).thenReturn(List.of(category, inactive));
		when(categoryMapper.toDto(category)).thenReturn(categoryDto);
		
		List<CategoryDto> result = categoryService.findAll();
		
		assertThat(result).hasSize(1);
		assertThat(result.getFirst().name()).isEqualTo("Картриджи");
	}
	
	@Test
	@DisplayName("findAll —  returns empty when no active")
	void findAll_returnsEmpty_whenNoActive() {
		Category inactive = Category.builder()
			.id(1L).name("X").slug("x").isActive(false).build();
		when(categoryRepository.findAll()).thenReturn(List.of(inactive));
		
		assertThat(categoryService.findAll()).isEmpty();
	}
	
	@Test
	@DisplayName("findById —  returns DTO when found")
	void findById_returnsDto_whenFound() {
		when(categoryRepository.findById(2L)).thenReturn(Optional.of(category));
		when(categoryMapper.toDto(category)).thenReturn(categoryDto);
		
		CategoryDto result = categoryService.findById(2L);
		
		assertThat(result.id()).isEqualTo(2L);
		assertThat(result.name()).isEqualTo("Картриджи");
	}
	
	@Test
	@DisplayName("findById —  throws ResourceNotFoundException when missing")
	void findById_throwsNotFound_whenMissing() {
		when(categoryRepository.findById(99L)).thenReturn(Optional.empty());
		
		assertThatThrownBy(() -> categoryService.findById(99L))
			.isInstanceOf(ResourceNotFoundException.class)
			.hasMessageContaining("99");
	}
	
	@Test
	@DisplayName("create —  saves category without parent")
	void create_savesCategory_withoutParent() {
		var request = new CategoryRequest("Картриджи", "kartridzhi", null, null);
		
		when(categoryRepository.existsBySlug("kartridzhi")).thenReturn(false);
		when(categoryRepository.save(any(Category.class))).thenReturn(category);
		when(categoryMapper.toDto(category)).thenReturn(categoryDto);
		
		CategoryDto result = categoryService.create(request);
		
		assertThat(result.name()).isEqualTo("Картриджи");
		verify(categoryRepository).save(any(Category.class));
	}
	
	@Test
	@DisplayName("create —  saves category with parent")
	void create_savesCategory_withParent() {
		var request = new CategoryRequest("Картриджи", "kartridzhi", null, 1L);
		
		when(categoryRepository.existsBySlug("kartridzhi")).thenReturn(false);
		when(categoryRepository.findById(1L)).thenReturn(Optional.of(parent));
		when(categoryRepository.save(any(Category.class))).thenAnswer(inv -> inv.getArgument(0));
		when(categoryMapper.toDto(any())).thenReturn(categoryDto);
		
		categoryService.create(request);
		
		verify(categoryRepository).save(argThat(c -> c.getParent() != null
			&& c.getParent().getId().equals(1L)));
	}
	
	@Test
	@DisplayName("create —  throws AlreadyExistsException when slug taken")
	void create_throwsAlreadyExists_whenSlugTaken() {
		var request = new CategoryRequest("Картриджи", "kartridzhi", null, null);
		
		when(categoryRepository.existsBySlug("kartridzhi")).thenReturn(true);
		
		assertThatThrownBy(() -> categoryService.create(request))
			.isInstanceOf(AlreadyExistsException.class)
			.hasMessageContaining("kartridzhi");
		
		verify(categoryRepository, never()).save(any());
	}
	
	@Test
	@DisplayName("create —  throws ResourceNotFoundException when parent missing")
	void create_throwsNotFound_whenParentMissing() {
		var request = new CategoryRequest("Картриджи", "kartridzhi", null, 99L);
		
		when(categoryRepository.existsBySlug("kartridzhi")).thenReturn(false);
		when(categoryRepository.findById(99L)).thenReturn(Optional.empty());
		
		assertThatThrownBy(() -> categoryService.create(request))
			.isInstanceOf(ResourceNotFoundException.class)
			.hasMessageContaining("Parent category not found");
		
		verify(categoryRepository, never()).save(any());
	}
	
	@Test
	@DisplayName("update —  updates category")
	void update_updatesCategory() {
		var request = new CategoryRequest("Новое имя", "kartridzhi", "Описание", null);
		
		when(categoryRepository.findById(2L)).thenReturn(Optional.of(category));
		when(categoryRepository.save(category)).thenReturn(category);
		when(categoryMapper.toDto(category)).thenReturn(categoryDto);
		
		categoryService.update(2L, request);
		
		assertThat(category.getName()).isEqualTo("Новое имя");
		assertThat(category.getDescription()).isEqualTo("Описание");
		verify(categoryRepository).save(category);
	}
	
	@Test
	@DisplayName("update —  throws AlreadyExistsException when new slug taken")
	void update_throwsAlreadyExists_whenNewSlugTaken() {
		var request = new CategoryRequest("Картриджи", "drugoy-slug", null, null);
		
		when(categoryRepository.findById(2L)).thenReturn(Optional.of(category));
		when(categoryRepository.existsBySlug("drugoy-slug")).thenReturn(true);
		
		assertThatThrownBy(() -> categoryService.update(2L, request))
			.isInstanceOf(AlreadyExistsException.class);
		
		verify(categoryRepository, never()).save(any());
	}
	
	@Test
	@DisplayName("update —  does not check slug when unchange")
	void update_doesNotCheckSlug_whenUnchanged() {
		var request = new CategoryRequest("Новое имя", "kartridzhi", null, null);
		
		when(categoryRepository.findById(2L)).thenReturn(Optional.of(category));
		when(categoryRepository.save(category)).thenReturn(category);
		when(categoryMapper.toDto(category)).thenReturn(categoryDto);
		
		categoryService.update(2L, request);
		
		verify(categoryRepository, never()).existsBySlug(any());
	}
	
	@Test
	@DisplayName("update —  throws ResourceNotFoundException when missing")
	void update_throwsNotFound_whenMissing() {
		when(categoryRepository.findById(99L)).thenReturn(Optional.empty());
		
		assertThatThrownBy(() -> categoryService.update(99L,
			new CategoryRequest("X", "x", null, null)))
			.isInstanceOf(ResourceNotFoundException.class)
			.hasMessageContaining("99");
	}
	
	@Test
	@DisplayName("delete —  set isActive = false (soft delete)")
	void delete_setsInactive() {
		when(categoryRepository.findById(2L)).thenReturn(Optional.of(category));
		
		categoryService.delete(2L);
		
		assertThat(category.isActive()).isFalse();
		verify(categoryRepository).save(category);
	}
	
	@Test
	@DisplayName("delete —  throws ResourceNotFoundException when missing")
	void delete_throwsNotFound_whenMissing() {
		when(categoryRepository.findById(99L)).thenReturn(Optional.empty());
		
		assertThatThrownBy(() -> categoryService.delete(99L))
			.isInstanceOf(ResourceNotFoundException.class);
		
		verify(categoryRepository, never()).save(any());
	}
}