package dev.remito.product;

import dev.remito.brand.Brand;
import dev.remito.brand.BrandRepository;
import dev.remito.category.Category;
import dev.remito.category.CategoryRepository;
import dev.remito.color.Color;
import dev.remito.color.ColorRepository;
import dev.remito.exception.AlreadyExistsException;
import dev.remito.exception.ResourceNotFoundException;
import dev.remito.file.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static dev.remito.config.CacheConfig.CACHE_PRODUCTS;

@Service
@RequiredArgsConstructor
public class ProductService {
	
	private final ProductRepository productRepository;
	private final CategoryRepository categoryRepository;
	private final BrandRepository brandRepository;
	private final ColorRepository colorRepository;
	private final ProductMapper productMapper;
	// НОВОЕ: для удаления старых фото из R2 при замене
	private final FileStorageService fileStorageService;
	
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
		
		// НОВОЕ: галерея
		product.setImages(buildImages(product, request.gallery()));
		
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
		product.setCategory(resolveCategory(request.categoryId()));
		product.setBrand(request.brandId() != null ? resolveBrand(request.brandId()) : null);
		product.setColor(request.colorId() != null ? resolveColor(request.colorId()) : null);
		
		// НОВОЕ: сменить главное фото и/или галерею
		replaceMainImage(product, request.imageUrl());
		replaceGallery(product, request.gallery());
		
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
		// Если хочется удалять и файлы при удалении товара — раскомментируй:
		// deleteImagesFromR2(product);
	}
	
	// --- helpers ---
	
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
	
	// -- галерея --
	
	private List<ProductImage> buildImages(Product product, List<String> gallery) {
		if (gallery == null || gallery.isEmpty()) {
			return new ArrayList<>();
		}
		List<ProductImage> list = new ArrayList<>();
		for (int i = 0; i < gallery.size(); i++) {
			if (gallery.get(i) == null || gallery.get(i).isBlank()) continue;
			list.add(ProductImage.builder()
				.product(product)
				.url(gallery.get(i).trim())
				.sortOrder(i)
				.build());
		}
		return list;
	}
	
	/**
	 * Заменяет галерею: старые фото удаляем из R2, добавляем новые.
	 */
	private void replaceGallery(Product product, List<String> gallery) {
		List<String> oldUrls = product.getImages().stream().map(ProductImage::getUrl).toList();
		product.getImages().clear(); // orphanRemoval=true удалит записи из БД
		
		for (ProductImage img : buildImages(product, gallery)) {
			product.getImages().add(img);
		}
		
		// чистим в R2 файлы, которых больше нет в новом списке
		List<String> newUrls = product.getImages().stream().map(ProductImage::getUrl).toList();
		oldUrls.stream()
			.filter(url -> !newUrls.contains(url))
			.forEach(this::deleteFileByUrl);
	}
	
	/**
	 * Если главное фото сменилось — удаляет старое из R2.
	 */
	private void replaceMainImage(Product product, String newImageUrl) {
		String trimmed = newImageUrl == null ? null : newImageUrl.trim();
		if (trimmed != null && !trimmed.equals(product.getImageUrl())) {
			String old = product.getImageUrl();
			product.setImageUrl(trimmed);
			if (old != null) deleteFileByUrl(old);
		} else {
			product.setImageUrl(trimmed);
		}
	}
	
	private void deleteImagesFromR2(Product product) {
		if (product.getImageUrl() != null) deleteFileByUrl(product.getImageUrl());
		product.getImages().forEach(img -> deleteFileByUrl(img.getUrl()));
	}
	
	private void deleteFileByUrl(String url) {
		if (url == null || url.isBlank()) return;
		// Из "/api/v1/files/<key>" вытаскиваем key
		String key = url.contains("/files/")
			? url.substring(url.indexOf("/files/") + "/files/".length())
			: url;
		try {
			fileStorageService.delete(key);
		} catch (RuntimeException e) {
			// не роняем обновление товара, если файл уже удалён из R2
		}
	}
}
