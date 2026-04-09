package dev.remito.article;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ArticleMapper {
	
	@Mapping(target = "authorName", source = "author.name")
	ArticleDto toDto(Article article);
	
	List<ArticleDto> toDtoList(List<Article> articles);
}