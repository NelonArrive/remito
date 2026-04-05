package dev.remito.product;

import dev.remito.brand.Brand;
import dev.remito.brand.BrandRepository;
import dev.remito.category.Category;
import dev.remito.category.CategoryRepository;
import dev.remito.color.Color;
import dev.remito.color.ColorRepository;
import dev.remito.exception.AlreadyExistsException;
import dev.remito.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static dev.remito.config.CacheConfig.CACHE_PRODUCTS;

@Service
@RequiredArgsConstructor
public class ProductService {
	
	private final ProductRepository productRepository;
	private final CategoryRepository categoryRepository;
	private final BrandRepository brandRepository;
	private final ColorRepository colorRepository;
	private final ProductMapper productMapper;
	
	public Page<ProductDto> findAll(ProductFilter filter) {
		var pageable = PageRequest.of(filter.page(), filter.size());
		return productRepository
			.findAll(ProductSpecification.build(filter), pageable)
			.map(productMapper::toDto);
	}
	
	@Cacheable(value = CACHE_PRODUCTS, key = "'slug_' + #slug")
	public ProductDto findBySlug(String slug) {
		return productRepository.findBySlug(slug)
			.map(productMapper::toDto)
			.orElseThrow(() -> new ResourceNotFoundException("Product not found: " + slug));
	}
	
	@Cacheable(value = CACHE_PRODUCTS, key = "#id")
	public ProductDto findById(Long id) {
		return productRepository.findById(id)
			.map(productMapper::toDto)
			.orElseThrow(() -> new ResourceNotFoundException("Product not found: " + id));
	}
	
	@CacheEvict(value = CACHE_PRODUCTS, allEntries = true)
	@Transactional
	public ProductDto create(ProductRequest request) {
		if (productRepository.existsBySlug(request.slug())) {
			throw new AlreadyExistsException("Slug already exists: " + request.slug());
		}
		
		Product product = Product.builder()
			.name(request.name())
			.slug(request.slug())
			.description(request.description())
			.price(request.price())
			.stockQuantity(request.stockQuantity() != null ? request.stockQuantity() : 0)
			.imageUrl(request.imageUrl())
			.category(resolveCategory(request.categoryId()))
			.brand(request.brandId() != null ? resolveBrand(request.brandId()) : null)
			.color(request.colorId() != null ? resolveColor(request.colorId()) : null)
			.build();
		
		Product savedProduct = productRepository.save(product);
		return productMapper.toDto(savedProduct);
	}
	
	@CacheEvict(value = CACHE_PRODUCTS, allEntries = true)
	@Transactional
	public ProductDto update(Long id, ProductRequest request) {
		Product product = productRepository.findById(id)
			.orElseThrow(() -> new ResourceNotFoundException("Product not found: " + id));
		
		if (!product.getSlug().equals(request.slug()) && productRepository.existsBySlug(request.slug())) {
			throw new AlreadyExistsException("Slug already exists: " + request.slug());
		}
		
		product.setName(request.name());
		product.setSlug(request.slug());
		product.setDescription(request.description());
		product.setPrice(request.price());
		product.setStockQuantity(request.stockQuantity() != null ? request.stockQuantity() : 0);
		product.setImageUrl(request.imageUrl());
		product.setCategory(resolveCategory(request.categoryId()));
		product.setBrand(request.brandId() != null ? resolveBrand(request.brandId()) : null);
		product.setColor(request.colorId() != null ? resolveColor(request.colorId()) : null);
		
		Product savedProduct = productRepository.save(product);
		return productMapper.toDto(savedProduct);
	}
	
	@CacheEvict(value = CACHE_PRODUCTS, allEntries = true)
	@Transactional
	public void delete(Long id) {
		Product product = productRepository.findById(id)
			.orElseThrow(() -> new ResourceNotFoundException("Product not found: " + id));
		product.setActive(false);
		productRepository.save(product);
	}
	
	private Category resolveCategory(Long id) {
		return categoryRepository.findById(id)
			.orElseThrow(() -> new ResourceNotFoundException("Category not found: " + id));
	}
	
	private Brand resolveBrand(Long id) {
		return brandRepository.findById(id)
			.orElseThrow(() -> new ResourceNotFoundException("Brand not found: " + id));
	}
	
	private Color resolveColor(Long id) {
		return colorRepository.findById(id)
			.orElseThrow(() -> new ResourceNotFoundException("Color not found: " + id));
	}
}