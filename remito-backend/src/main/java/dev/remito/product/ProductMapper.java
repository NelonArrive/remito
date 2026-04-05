package dev.remito.product;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductMapper {
	
	@Mapping(source = "category.name", target = "categoryName")
	@Mapping(source = "brand.name", target = "brandName")
	ProductDto toDto(Product product);
	
	List<ProductDto> toDtoList(List<Product> products);
}