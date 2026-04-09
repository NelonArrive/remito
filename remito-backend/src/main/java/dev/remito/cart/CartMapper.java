package dev.remito.cart;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.math.BigDecimal;
import java.util.List;

@Mapper(componentModel = "spring")
public interface CartMapper {
	
	@Mapping(target = "items", source = "items")
	@Mapping(target = "totalItems", expression = "java(cart.getItems().size())")
	@Mapping(target = "totalAmount", expression = "java(calculateTotal(cart))")
	CartDto toDto(Cart cart);
	
	@Mapping(source = "product.id", target = "productId")
	@Mapping(source = "product.name", target = "productName")
	@Mapping(source = "product.imageUrl", target = "productImage")
	@Mapping(source = "priceSnapshot", target = "price")
	@Mapping(target = "total", expression = "java(item.getPriceSnapshot().multiply(java.math.BigDecimal.valueOf(item.getQuantity())))")
	CartItemDto toItemDto(CartItem item);
	
	List<CartItemDto> toItemDtoList(List<CartItem> items);
	
	default BigDecimal calculateTotal(Cart cart) {
		return cart.getItems().stream()
			.map(i -> i.getPriceSnapshot()
				.multiply(BigDecimal.valueOf(i.getQuantity())))
			.reduce(BigDecimal.ZERO, BigDecimal::add);
	}
}