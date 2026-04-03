package dev.remito.article;

import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ArticleMapper {
	ArticleDto toDto(Article article);
	
	List<Article> toDtoList(List<Article> categories);
}
