package dev.remito.user;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
	
	@Mapping(source = "role", target = "role")
	UserDto toDto(User user);
}