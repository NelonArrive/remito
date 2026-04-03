package dev.remito.cart;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CartMapper {
	
	CartDto toDto(Cart cart);
	
	@Mapping(source = "product.name", target = "productName")
	@Mapping(source = "product.imageUrl", target = "productImage")
	@Mapping(source = "priceSnapshot", target = "price")
	CartItemDto toItemDto(CartItem item);
	
	List<CartItemDto> toItemDtoList(List<CartItem> items);
}