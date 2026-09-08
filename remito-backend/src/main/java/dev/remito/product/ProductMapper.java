package dev.remito.product;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.Comparator;
import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductMapper {
	
	@Mapping(source = "category.name", target = "categoryName")
	@Mapping(source = "brand.name", target = "brandName")
	// НОВОЕ: превращаем список ProductImage в список url (по порядку sortOrder)
	@Mapping(source = "images", target = "gallery", qualifiedByName = "toUrls")
	ProductDto toDto(Product product);
	
	List<ProductDto> toDtoList(List<Product> products);
	
	@Named("toUrls")
	default List<String> toUrls(List<ProductImage> images) {
		if (images == null) return List.of();
		return images.stream()
			.sorted(Comparator.comparingInt(img -> img.getSortOrder() == null ? 0 : img.getSortOrder()))
			.map(ProductImage::getUrl)
			.toList();
	}
}
