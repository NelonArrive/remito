package dev.remito.article;

import dev.remito.exception.AlreadyExistsException;
import dev.remito.exception.ResourceNotFoundException;
import dev.remito.user.User;
import dev.remito.user.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ArticleServiceTest {
	
	@Mock
	ArticleRepository articleRepository;
	@Mock
	UserRepository userRepository;
	@Mock
	ArticleMapper articleMapper;
	
	@InjectMocks
	ArticleService articleService;
	
	private User author;
	private Article article;
	private ArticleDto articleDto;
	
	@BeforeEach
	void setUp() {
		author = User.builder()
			.id(1L).email("admin@remito.dev").name("Админ").build();
		
		article = Article.builder()
			.id(1L)
			.title("Как выбрать картридж")
			.slug("kak-vybrat-kartridzh")
			.content("Полный текст статьи...")
			.previewText("Краткое описание")
			.author(author)
			.isPublished(true)
			.publishedAt(LocalDateTime.now())
			.build();
		
		articleDto = new ArticleDto(
			1L, "Как выбрать картридж", "kak-vybrat-kartridzh",
			"Полный текст статьи...", "Краткое описание",
			null, "Админ", true, article.getPublishedAt(), article.getCreatedAt()
		);
	}
	
	@Test
	@DisplayName("findPublished —  returns page published articles")
	void findPublished_returnsPage() {
		var pageable = PageRequest.of(0, 10, Sort.by("publishedAt").descending());
		var page = new PageImpl<>(List.of(article), pageable, 1);
		
		when(articleRepository.findAllByIsPublishedTrue(any(PageRequest.class))).thenReturn(page);
		when(articleMapper.toDto(article)).thenReturn(articleDto);
		
		var result = articleService.findPublished(0, 10);
		
		assertThat(result.getContent()).hasSize(1);
		assertThat(result.getContent().getFirst().title()).isEqualTo("Как выбрать картридж");
	}
	
	@Test
	@DisplayName("findPublished —  returns empty page when missing")
	void findPublished_returnsEmptyPage() {
		var pageable = PageRequest.of(0, 10, Sort.by("publishedAt").descending());
		when(articleRepository.findAllByIsPublishedTrue(any(PageRequest.class)))
			.thenReturn(new PageImpl<>(List.of(), pageable, 0));
		
		var result = articleService.findPublished(0, 10);
		
		assertThat(result.getContent()).isEmpty();
	}
	
	@Test
	@DisplayName("findBySlug —  returns DTO by slug")
	void findBySlug_returnsDto_whenFound() {
		when(articleRepository.findBySlug("kak-vybrat-kartridzh")).thenReturn(Optional.of(article));
		when(articleMapper.toDto(article)).thenReturn(articleDto);
		
		ArticleDto result = articleService.findBySlug("kak-vybrat-kartridzh");
		
		assertThat(result.slug()).isEqualTo("kak-vybrat-kartridzh");
	}
	
	@Test
	@DisplayName("findBySlug —  throws ResourceNotFoundException when missing")
	void findBySlug_throwsNotFound_whenMissing() {
		when(articleRepository.findBySlug("unknown")).thenReturn(Optional.empty());
		
		assertThatThrownBy(() -> articleService.findBySlug("unknown"))
			.isInstanceOf(ResourceNotFoundException.class)
			.hasMessageContaining("unknown");
	}
	
	@Test
	@DisplayName("create —  saves article and returns DTO")
	void create_savesArticle_andReturnsDto() {
		var request = new ArticleRequest(
			"Как выбрать картридж", "kak-vybrat-kartridzh",
			"Полный текст...", "Краткое", null, false
		);
		
		when(articleRepository.existsBySlug("kak-vybrat-kartridzh")).thenReturn(false);
		when(userRepository.findById(1L)).thenReturn(Optional.of(author));
		when(articleRepository.save(any(Article.class))).thenReturn(article);
		when(articleMapper.toDto(article)).thenReturn(articleDto);
		
		ArticleDto result = articleService.create(request, 1L);
		
		assertThat(result.title()).isEqualTo("Как выбрать картридж");
		verify(articleRepository).save(any(Article.class));
	}
	
	@Test
	@DisplayName("create —  sets publishedAt when publish=true")
	void create_setsPublishedAt_whenPublishTrue() {
		var request = new ArticleRequest(
			"Статья", "statya", "Текст", null, null, true
		);
		
		when(articleRepository.existsBySlug("statya")).thenReturn(false);
		when(userRepository.findById(1L)).thenReturn(Optional.of(author));
		when(articleRepository.save(any(Article.class))).thenAnswer(inv -> inv.getArgument(0));
		when(articleMapper.toDto(any())).thenReturn(articleDto);
		
		articleService.create(request, 1L);
		
		verify(articleRepository).save(argThat(a ->
			a.isPublished() && a.getPublishedAt() != null
		));
	}
	
	@Test
	@DisplayName("create —  publishedAt remains null when publish=false")
	void create_doesNotSetPublishedAt_whenPublishFalse() {
		var request = new ArticleRequest(
			"Черновик", "chernovik", "Текст", null, null, false
		);
		
		when(articleRepository.existsBySlug("chernovik")).thenReturn(false);
		when(userRepository.findById(1L)).thenReturn(Optional.of(author));
		when(articleRepository.save(any(Article.class))).thenAnswer(inv -> inv.getArgument(0));
		when(articleMapper.toDto(any())).thenReturn(articleDto);
		
		articleService.create(request, 1L);
		
		verify(articleRepository).save(argThat(a ->
			!a.isPublished() && a.getPublishedAt() == null
		));
	}
	
	@Test
	@DisplayName("create —  throws AlreadyExistsException when slug taken")
	void create_throwsAlreadyExists_whenSlugTaken() {
		var request = new ArticleRequest(
			"Статья", "kak-vybrat-kartridzh", "Текст", null, null, false
		);
		
		when(articleRepository.existsBySlug("kak-vybrat-kartridzh")).thenReturn(true);
		
		assertThatThrownBy(() -> articleService.create(request, 1L))
			.isInstanceOf(AlreadyExistsException.class)
			.hasMessageContaining("kak-vybrat-kartridzh");
		
		verify(articleRepository, never()).save(any());
	}
	
	@Test
	@DisplayName("create —  throws ResourceNotFoundException when author missing")
	void create_throwsNotFound_whenAuthorMissing() {
		var request = new ArticleRequest(
			"Статья", "statya", "Текст", null, null, false
		);
		
		when(articleRepository.existsBySlug("statya")).thenReturn(false);
		when(userRepository.findById(99L)).thenReturn(Optional.empty());
		
		assertThatThrownBy(() -> articleService.create(request, 99L))
			.isInstanceOf(ResourceNotFoundException.class)
			.hasMessageContaining("99");
	}
	
	@Test
	@DisplayName("update —  updates article fields")
	void update_updatesArticle() {
		var request = new ArticleRequest(
			"Новый заголовок", "kak-vybrat-kartridzh",
			"Новый текст", "Новое превью", null, false
		);
		
		when(articleRepository.findById(1L)).thenReturn(Optional.of(article));
		when(articleRepository.save(article)).thenReturn(article);
		when(articleMapper.toDto(article)).thenReturn(articleDto);
		
		articleService.update(1L, request);
		
		assertThat(article.getTitle()).isEqualTo("Новый заголовок");
		assertThat(article.getContent()).isEqualTo("Новый текст");
		verify(articleRepository).save(article);
	}
	
	@Test
	@DisplayName("update —  publishes article when was draft")
	void update_publishes_whenWasDraft() {
		article.setPublished(false);
		article.setPublishedAt(null);
		
		var request = new ArticleRequest(
			"Статья", "kak-vybrat-kartridzh", "Текст", null, null, true
		);
		
		when(articleRepository.findById(1L)).thenReturn(Optional.of(article));
		when(articleRepository.save(article)).thenReturn(article);
		when(articleMapper.toDto(article)).thenReturn(articleDto);
		
		articleService.update(1L, request);
		
		assertThat(article.isPublished()).isTrue();
		assertThat(article.getPublishedAt()).isNotNull();
	}
	
	@Test
	@DisplayName("update —  does not publishedAt when already published")
	void update_doesNotResetPublishedAt_whenAlreadyPublished() {
		LocalDateTime originalPublishedAt = article.getPublishedAt();
		var request = new ArticleRequest(
			"Обновлённая", "kak-vybrat-kartridzh", "Текст", null, null, true
		);
		
		when(articleRepository.findById(1L)).thenReturn(Optional.of(article));
		when(articleRepository.save(article)).thenReturn(article);
		when(articleMapper.toDto(article)).thenReturn(articleDto);
		
		articleService.update(1L, request);
		
		assertThat(article.getPublishedAt()).isEqualTo(originalPublishedAt);
	}
	
	@Test
	@DisplayName("update —  throws AlreadyExistsException when new slug taken")
	void update_throwsAlreadyExists_whenNewSlugTaken() {
		var request = new ArticleRequest(
			"Статья", "drugoy-slug", "Текст", null, null, false
		);
		
		when(articleRepository.findById(1L)).thenReturn(Optional.of(article));
		when(articleRepository.existsBySlug("drugoy-slug")).thenReturn(true);
		
		assertThatThrownBy(() -> articleService.update(1L, request))
			.isInstanceOf(AlreadyExistsException.class);
		
		verify(articleRepository, never()).save(any());
	}
	
	@Test
	@DisplayName("update —  throws ResourceNotFoundException when missing")
	void update_throwsNotFound_whenMissing() {
		when(articleRepository.findById(99L)).thenReturn(Optional.empty());
		
		assertThatThrownBy(() -> articleService.update(99L,
			new ArticleRequest("T", "s", "C", null, null, false)))
			.isInstanceOf(ResourceNotFoundException.class)
			.hasMessageContaining("99");
	}
	
	@Test
	@DisplayName("delete —  deletes article")
	void delete_deletesArticle() {
		when(articleRepository.existsById(1L)).thenReturn(true);
		
		articleService.delete(1L);
		
		verify(articleRepository).deleteById(1L);
	}
	
	@Test
	@DisplayName("delete —  throws ResourceNotFoundException when missing")
	void delete_throwsNotFound_whenMissing() {
		when(articleRepository.existsById(99L)).thenReturn(false);
		
		assertThatThrownBy(() -> articleService.delete(99L))
			.isInstanceOf(ResourceNotFoundException.class)
			.hasMessageContaining("99");
		
		verify(articleRepository, never()).deleteById(any());
	}
}