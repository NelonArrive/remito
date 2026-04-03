package dev.remito.brand;

import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BrandMapper {
	
	BrandDto toDto(Brand brand);
	
	List<BrandDto> toDtoList(List<Brand> categories);
}
