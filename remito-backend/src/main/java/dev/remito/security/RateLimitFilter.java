package dev.remito.security;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.BucketConfiguration;
import io.github.bucket4j.redis.lettuce.cas.LettuceBasedProxyManager;
import io.lettuce.core.RedisClient;
import io.lettuce.core.api.StatefulRedisConnection;
import io.lettuce.core.codec.ByteArrayCodec;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.jspecify.annotations.NonNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Duration;
import java.util.Set;
import java.util.function.Supplier;

@Slf4j
@Component
public class RateLimitFilter extends OncePerRequestFilter {
	
	private static final Set<String> RATE_LIMITED_PATHS = Set.of(
		"/api/v1/auth/login",
		"/api/v1/auth/signup",
		"/api/v1/orders"
	);
	
	private final LettuceBasedProxyManager<byte[]> proxyManager;
	
	private final Supplier<BucketConfiguration> bucketConfig = () ->
		BucketConfiguration.builder()
			.addLimit(Bandwidth.builder()
				.capacity(10)
				.refillGreedy(10, Duration.ofMinutes(30))
				.build())
			.build();
	
	public RateLimitFilter(
		@Value("${spring.data.redis.host}") String redisHost,
		@Value("${spring.data.redis.port}") int redisPort
	) {
		RedisClient redisClient = RedisClient.create(
			"redis://" + redisHost + ":" + redisPort
		);
		StatefulRedisConnection<byte[], byte[]> connection =
			redisClient.connect(ByteArrayCodec.INSTANCE);
		
		this.proxyManager = LettuceBasedProxyManager.builderFor(connection).build();
	}
	
	@Override
	protected void doFilterInternal(
		@NonNull HttpServletRequest request,
		@NonNull HttpServletResponse response,
		@NonNull FilterChain filterChain
	) throws ServletException, IOException {
		String path = request.getRequestURI();
		
		if (!RATE_LIMITED_PATHS.contains(path)) {
			filterChain.doFilter(request, response);
			return;
		}
		
		String ip = getClientIp(request);
		String bucketKey = "rate_limit:" + path + ":" + ip;
		
		var bucket = proxyManager.builder()
			.build(bucketKey.getBytes(), bucketConfig);
		
		if (bucket.tryConsume(1)) {
			filterChain.doFilter(request, response);
		} else {
			log.warn("Rate limit exceeded for IP: {} on path: {}", ip, path);
			response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
			response.setContentType("application/json");
			response.getWriter().write("""
				{"status":429,"error":"Too Many Requests","message":"Too many requests, try again later"}
				""");
		}
	}
	
	private String getClientIp(HttpServletRequest request) {
		String forwarded = request.getHeader("X-Forwarded-For");
		if (forwarded != null && !forwarded.isBlank()) {
			return forwarded.split(",")[0].trim();
		}
		return request.getRemoteAddr();
	}
	
}
