package dev.remito.category;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
	
	@Mapping(source = "parent.id", target = "parentId")
	@Mapping(source = "parent.name", target = "parentName")
	CategoryDto toDto(Category category);
	
	List<CategoryDto> toDtoList(List<Category> categories);
}