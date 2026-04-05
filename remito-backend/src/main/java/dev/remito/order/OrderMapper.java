package dev.remito.order;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrderMapper {
	
	@Mapping(source = "payerType", target = "payerType")
	@Mapping(source = "paymentMethod", target = "paymentMethod")
	@Mapping(source = "status", target = "status")
	OrderDto toDto(Order order);
	
	@Mapping(source = "nameSnapshot", target = "productName")
	@Mapping(source = "priceSnapshot", target = "price")
	OrderItemDto toItemDto(OrderItem item);
	
	List<OrderItemDto> toItemDtoList(List<OrderItem> items);
}