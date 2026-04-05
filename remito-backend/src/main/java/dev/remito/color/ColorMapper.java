package dev.remito.color;

import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ColorMapper {
	
	ColorDto toDto(Color color);
	
	List<ColorDto> toDtoList(List<Color> colors);
}