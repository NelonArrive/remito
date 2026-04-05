package dev.remito.brand;

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
class BrandServiceTest {
	
	@Mock
	BrandRepository brandRepository;
	@Mock
	BrandMapper brandMapper;
	
	@InjectMocks
	BrandService brandService;
	
	private Brand brand;
	private BrandDto brandDto;
	
	@BeforeEach
	void setUp() {
		brand = Brand.builder()
			.id(1L)
			.name("Canon")
			.logoUrl("https://cdn.remito.dev/brands/canon.png")
			.isActive(true)
			.build();
		
		brandDto = new BrandDto(1L, "Canon", "https://cdn.remito.dev/brands/canon.png", true);
	}
	
	@Test
	@DisplayName("findAll —  returns only active brand")
	void findAll_returnsOnlyActiveBrands() {
		Brand inactive = Brand.builder().id(2L).name("Xerox").isActive(false).build();
		
		when(brandRepository.findAll()).thenReturn(List.of(brand, inactive));
		when(brandMapper.toDto(brand)).thenReturn(brandDto);
		
		List<BrandDto> result = brandService.findAll();
		
		assertThat(result).hasSize(1);
		assertThat(result.getFirst().name()).isEqualTo("Canon");
	}
	
	@Test
	@DisplayName("findAll —  returns empty list when no active brands")
	void findAll_returnsEmpty_whenNoActiveBrands() {
		Brand inactive = Brand.builder().id(1L).name("Canon").isActive(false).build();
		when(brandRepository.findAll()).thenReturn(List.of(inactive));
		
		assertThat(brandService.findAll()).isEmpty();
	}
	
	@Test
	@DisplayName("findById —  returns DTO when found")
	void findById_returnsDto_whenFound() {
		when(brandRepository.findById(1L)).thenReturn(Optional.of(brand));
		when(brandMapper.toDto(brand)).thenReturn(brandDto);
		
		BrandDto result = brandService.findById(1L);
		
		assertThat(result.id()).isEqualTo(1L);
		assertThat(result.name()).isEqualTo("Canon");
	}
	
	@Test
	@DisplayName("findById —  throws ResourceNotFoundException when missing")
	void findById_throwsNotFound_whenMissing() {
		when(brandRepository.findById(99L)).thenReturn(Optional.empty());
		
		assertThatThrownBy(() -> brandService.findById(99L))
			.isInstanceOf(ResourceNotFoundException.class)
			.hasMessageContaining("99");
	}
	
	@Test
	@DisplayName("create —  saves and returns DTO")
	void create_savesBrand_andReturnsDto() {
		var request = new BrandRequest("Canon", "https://cdn.remito.dev/brands/canon.png");
		
		when(brandRepository.existsByName("Canon")).thenReturn(false);
		when(brandRepository.save(any(Brand.class))).thenReturn(brand);
		when(brandMapper.toDto(brand)).thenReturn(brandDto);
		
		BrandDto result = brandService.create(request);
		
		assertThat(result.name()).isEqualTo("Canon");
		verify(brandRepository).save(any(Brand.class));
	}
	
	@Test
	@DisplayName("create —  throws AlreadyExistsException when name taken")
	void create_throwsAlreadyExists_whenNameTaken() {
		var request = new BrandRequest("Canon", null);
		
		when(brandRepository.existsByName("Canon")).thenReturn(true);
		
		assertThatThrownBy(() -> brandService.create(request))
			.isInstanceOf(AlreadyExistsException.class)
			.hasMessageContaining("Canon");
		
		verify(brandRepository, never()).save(any());
	}
	
	@Test
	@DisplayName("update —  updates name and logoUrl")
	void update_updatesBrand() {
		var request = new BrandRequest("Canon Updated", "https://cdn.remito.dev/brands/canon-new.png");
		
		when(brandRepository.findById(1L)).thenReturn(Optional.of(brand));
		when(brandRepository.save(brand)).thenReturn(brand);
		when(brandMapper.toDto(brand)).thenReturn(brandDto);
		
		brandService.update(1L, request);
		
		assertThat(brand.getName()).isEqualTo("Canon Updated");
		assertThat(brand.getLogoUrl()).isEqualTo("https://cdn.remito.dev/brands/canon-new.png");
		verify(brandRepository).save(brand);
	}
	
	@Test
	@DisplayName("update —  throws ResourceNotFoundException when missing")
	void update_throwsNotFound_whenMissing() {
		when(brandRepository.findById(99L)).thenReturn(Optional.empty());
		
		assertThatThrownBy(() -> brandService.update(99L, new BrandRequest("X", null)))
			.isInstanceOf(ResourceNotFoundException.class)
			.hasMessageContaining("99");
		
		verify(brandRepository, never()).save(any());
	}
	
	@Test
	@DisplayName("delete —  sets isActive = false (soft delete)")
	void delete_setsInactive() {
		when(brandRepository.findById(1L)).thenReturn(Optional.of(brand));
		
		brandService.delete(1L);
		
		assertThat(brand.isActive()).isFalse();
		verify(brandRepository).save(brand);
	}
	
	@Test
	@DisplayName("delete —  throws ResourceNotFoundException when missing")
	void delete_throwsNotFound_whenMissing() {
		when(brandRepository.findById(99L)).thenReturn(Optional.empty());
		
		assertThatThrownBy(() -> brandService.delete(99L))
			.isInstanceOf(ResourceNotFoundException.class);
		
		verify(brandRepository, never()).save(any());
	}
}