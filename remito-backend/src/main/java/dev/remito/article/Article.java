package dev.remito.article;

import dev.remito.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "articles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Article {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false)
	private String title;
	
	@Column(nullable = false, unique = true)
	private String slug;
	
	@Column(columnDefinition = "TEXT", nullable = false)
	private String content;
	
	@Column(columnDefinition = "TEXT")
	private String previewText;
	
	private String coverImage;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "author_id")
	private User author;
	
	@Column(nullable = false)
	@Builder.Default
	private boolean isPublished = false;
	
	private LocalDateTime publishedAt;
	
	@Column(nullable = false, updatable = false)
	@Builder.Default
	private LocalDateTime createdAt = LocalDateTime.now();
}