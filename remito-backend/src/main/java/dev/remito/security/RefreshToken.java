package dev.remito.security;

import org.springframework.data.annotation.Id;
import lombok.*;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;
import org.springframework.data.redis.core.index.Indexed;

@RedisHash("refresh_tokens")
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
