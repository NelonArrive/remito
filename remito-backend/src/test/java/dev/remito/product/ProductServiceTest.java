package dev.remito.product;

import dev.remito.brand.Brand;
import dev.remito.brand.BrandRepository;
import dev.remito.category.Category;
import dev.remito.category.CategoryRepository;
import dev.remito.color.ColorRepository;
import dev.remito.exception.AlreadyExistsException;
import dev.remito.exception.ResourceNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ProductServiceTest {
	
	@Mock
	ProductRepository productRepository;
	@Mock
	CategoryRepository categoryRepository;
	@Mock
	BrandRepository brandRepository;
	@Mock
	ColorRepository colorRepository;
	@Mock
	ProductMapper productMapper;
	
	@InjectMocks
	ProductService productService;
	
	private Product product;
	private ProductDto productDto;
	private Category category;
	private Brand brand;
	
	@BeforeEach
	void setUp() {
		category = Category.builder().id(1L).name("Картриджи").slug("kartridzhi").build();
		brand = Brand.builder().id(1L).name("Canon").build();
		
		product = Product.builder()
			.id(1L)
			.name("Canon 057")
			.slug("canon-057")
			.price(new BigDecimal("3200"))
			.stockQuantity(10)
			.category(category)
			.brand(brand)
			.isActive(true)
			.build();
		
		productDto = new ProductDto(
			1L, "Canon 057", "canon-057", null,
			new BigDecimal("3200"), 10,
			"Картриджи", "Canon", null, null,
			null, true
		);
	}
	
	@Test
	@DisplayName("findById - returns DTO when product found")
	void findById_returnsDto_whenFound() {
		when(productRepository.findById(1L)).thenReturn(Optional.of(product));
		when(productMapper.toDto(product)).thenReturn(productDto);
		
		ProductDto result = productService.findById(1L);
		
		assertThat(result.id()).isEqualTo(1L);
		assertThat(result.name()).isEqualTo("Canon 057");
	}
	
	@Test
	@DisplayName("findById —  throws ResourceNotFoundException when missing")
	void findById_throwsNotFound_whenMissing() {
		when(productRepository.findById(99L)).thenReturn(Optional.empty());
		
		assertThatThrownBy(() -> productService.findById(99L))
			.isInstanceOf(ResourceNotFoundException.class)
			.hasMessageContaining("99");
	}
	
	@Test
	@DisplayName("findBySlug —  returns DTO by slug")
	void findBySlug_returnsDto_whenFound() {
		when(productRepository.findBySlug("canon-057")).thenReturn(Optional.of(product));
		when(productMapper.toDto(product)).thenReturn(productDto);
		
		ProductDto result = productService.findBySlug("canon-057");
		
		assertThat(result.slug()).isEqualTo("canon-057");
	}
	
	@Test
	@DisplayName("findBySlug —  throws ResourceNotFoundException when missing")
	void findBySlug_throwsNotFound_whenMissing() {
		when(productRepository.findBySlug("unknown")).thenReturn(Optional.empty());
		
		assertThatThrownBy(() -> productService.findBySlug("unknown"))
			.isInstanceOf(ResourceNotFoundException.class);
	}
	
	@Test
	@DisplayName("findAll —  returns products page")
	void findAll_returnsPage() {
		var filter = new ProductFilter(null, null, null, null, null, null, "createdAt", "desc", 0, 20);
		var page = new PageImpl<>(List.of(product), PageRequest.of(0, 20), 1);
		
		when(productRepository.findAll(any(Specification.class), any(PageRequest.class))).thenReturn(page);
		when(productMapper.toDto(product)).thenReturn(productDto);
		
		var result = productService.findAll(filter);
		
		assertThat(result.getContent()).hasSize(1);
		assertThat(result.getContent().get(0).name()).isEqualTo("Canon 057");
	}
	
	@Test
	@DisplayName("create —  saves and returns product DTO")
	void create_savesProduct_andReturnsDto() {
		var request = new ProductRequest("Canon 057", "canon-057", null,
			new BigDecimal("3200"), 10, 1L, 1L, null, null);
		
		when(productRepository.existsBySlug("canon-057")).thenReturn(false);
		when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));
		when(brandRepository.findById(1L)).thenReturn(Optional.of(brand));
		when(productRepository.save(any(Product.class))).thenReturn(product);
		when(productMapper.toDto(product)).thenReturn(productDto);
		
		ProductDto result = productService.create(request);
		
		assertThat(result.name()).isEqualTo("Canon 057");
		verify(productRepository).save(any(Product.class));
	}
	
	@Test
	@DisplayName("create —  throws AlreadyExistsException when slug taken")
	void create_throwsAlreadyExists_whenSlugTaken() {
		var request = new ProductRequest("Canon 057", "canon-057", null,
			new BigDecimal("3200"), 10, 1L, null, null, null);
		
		when(productRepository.existsBySlug("canon-057")).thenReturn(true);
		
		assertThatThrownBy(() -> productService.create(request))
			.isInstanceOf(AlreadyExistsException.class)
			.hasMessageContaining("canon-057");
		
		verify(productRepository, never()).save(any());
	}
	
	@Test
	@DisplayName("create —  throws ResourceNotFoundException when category not found")
	void create_throwsNotFound_whenCategoryMissing() {
		var request = new ProductRequest("Canon 057", "canon-057", null,
			new BigDecimal("3200"), 10, 99L, null, null, null);
		
		when(productRepository.existsBySlug("canon-057")).thenReturn(false);
		when(categoryRepository.findById(99L)).thenReturn(Optional.empty());
		
		assertThatThrownBy(() -> productService.create(request))
			.isInstanceOf(ResourceNotFoundException.class)
			.hasMessageContaining("Category not found");
	}
	
	// ── update ────────────────────────────────────────────────
	
	@Test
	@DisplayName("update —  updates product")
	void update_updatesProduct() {
		var request = new ProductRequest("Canon 057 NEW", "canon-057", null,
			new BigDecimal("3500"), 5, 1L, 1L, null, null);
		
		when(productRepository.findById(1L)).thenReturn(Optional.of(product));
		when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));
		when(brandRepository.findById(1L)).thenReturn(Optional.of(brand));
		when(productRepository.save(any(Product.class))).thenReturn(product);
		when(productMapper.toDto(product)).thenReturn(productDto);
		
		productService.update(1L, request);
		
		verify(productRepository).save(any(Product.class));
	}
	
	@Test
	@DisplayName("update — throws AlreadyExistsException when new slug taken")
	void update_throwsAlreadyExists_whenNewSlugTaken() {
		var request = new ProductRequest("Canon 057", "hp-85a", null,
			new BigDecimal("3200"), 10, 1L, null, null, null);
		
		when(productRepository.findById(1L)).thenReturn(Optional.of(product));
		when(productRepository.existsBySlug("hp-85a")).thenReturn(true);
		
		assertThatThrownBy(() -> productService.update(1L, request))
			.isInstanceOf(AlreadyExistsException.class);
		
		verify(productRepository, never()).save(any());
	}
	
	// ── delete ────────────────────────────────────────────────
	
	@Test
	@DisplayName("delete —  set isActive = false (soft delete)")
	void delete_setsInactive() {
		when(productRepository.findById(1L)).thenReturn(Optional.of(product));
		
		productService.delete(1L);
		
		assertThat(product.isActive()).isFalse();
		verify(productRepository).save(product);
	}
	
	@Test
	@DisplayName("delete —  throws ResourceNotFoundException when missing")
	void delete_throwsNotFound_whenMissing() {
		when(productRepository.findById(99L)).thenReturn(Optional.empty());
		
		assertThatThrownBy(() -> productService.delete(99L))
			.isInstanceOf(ResourceNotFoundException.class);
		
		verify(productRepository, never()).save(any());
	}
}
