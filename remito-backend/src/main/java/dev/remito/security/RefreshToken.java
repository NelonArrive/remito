package dev.remito.security;

import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;
import org.springframework.data.redis.core.index.Indexed;

@RedisHash("refresh_token")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RefreshToken {
	
	@Id
	private String token;
	
	@Indexed
	private Long userId;
	
	@TimeToLive
	private Long ttlSeconds;
}
