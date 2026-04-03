package dev.remito.brand;

import dev.remito.exception.AlreadyExistsException;
import dev.remito.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BrandService {
	
	private final BrandRepository brandRepository;
	
	public List<BrandDto> findAll() {
		return brandRepository.findAll().stream()
			.filter(Brand::isActive)
			.map(BrandDto::from)
			.toList();
	}
	
	public BrandDto findById(Long id) {
		return brandRepository.findById(id)
			.map(BrandDto::from)
			.orElseThrow(() -> new ResourceNotFoundException("Brand not found: " + id));
	}
	
	@Transactional
	public BrandDto create(BrandRequest request) {
		if (brandRepository.existsByName(request.name())) {
			throw new AlreadyExistsException("Brand already exists: " + request.name());
		}
		Brand brand = Brand.builder()
			.name(request.name())
			.logoUrl(request.logoUrl())
			.build();
		return BrandDto.from(brandRepository.save(brand));
	}
	
	@Transactional
	public BrandDto update(Long id, BrandRequest request) {
		Brand brand = brandRepository.findById(id)
			.orElseThrow(() -> new ResourceNotFoundException("Brand not found: " + id));
		brand.setName(request.name());
		brand.setLogoUrl(request.logoUrl());
		return BrandDto.from(brandRepository.save(brand));
	}
	
	@Transactional
	public void delete(Long id) {
		Brand brand = brandRepository.findById(id)
			.orElseThrow(() -> new ResourceNotFoundException("Brand not found: " + id));
		brand.setActive(false);
		brandRepository.save(brand);
	}
}
