package dev.remito.brand;

import dev.remito.exception.AlreadyExistsException;
import dev.remito.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static dev.remito.config.CacheConfig.CACHE_BRANDS;

@Service
@RequiredArgsConstructor
public class BrandService {
	
	private final BrandRepository brandRepository;
	private final BrandMapper brandMapper;
	
	@Cacheable(value = CACHE_BRANDS)
	public List<BrandDto> findAll() {
		return brandRepository.findAll().stream()
			.filter(Brand::isActive)
			.map(brandMapper::toDto)
			.toList();
	}
	
	@Cacheable(value = CACHE_BRANDS, key = "#id")
	public BrandDto findById(Long id) {
		return brandRepository.findById(id)
			.map(brandMapper::toDto)
			.orElseThrow(() -> new ResourceNotFoundException("Brand not found: " + id));
	}
	
	@CacheEvict(value = CACHE_BRANDS, allEntries = true)
	@Transactional
	public BrandDto create(BrandRequest request) {
		if (brandRepository.existsByName(request.name())) {
			throw new AlreadyExistsException("Brand already exists: " + request.name());
		}
		Brand brand = Brand.builder()
			.name(request.name())
			.logoUrl(request.logoUrl())
			.build();
		Brand saved = brandRepository.save(brand);
		return brandMapper.toDto(saved);
	}
	
	@CacheEvict(value = CACHE_BRANDS, allEntries = true)
	@Transactional
	public BrandDto update(Long id, BrandRequest request) {
		Brand brand = brandRepository.findById(id)
			.orElseThrow(() -> new ResourceNotFoundException("Brand not found: " + id));
		brand.setName(request.name());
		brand.setLogoUrl(request.logoUrl());
		Brand saved = brandRepository.save(brand);
		return brandMapper.toDto(saved);
	}
	
	@CacheEvict(value = CACHE_BRANDS, allEntries = true)
	@Transactional
	public void delete(Long id) {
		Brand brand = brandRepository.findById(id)
			.orElseThrow(() -> new ResourceNotFoundException("Brand not found: " + id));
		brand.setActive(false);
		brandRepository.save(brand);
	}
}
