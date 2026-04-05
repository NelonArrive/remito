package dev.remito.config;

import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.RedisSerializer;

import java.time.Duration;
import java.util.Map;

@Configuration
@EnableCaching
public class CacheConfig {
	
	public static final String CACHE_CATEGORIES = "categories";
	public static final String CACHE_BRANDS = "brands";
	public static final String CACHE_COLORS = "colors";
	public static final String CACHE_PRODUCTS = "products";
	public static final String CACHE_ARTICLES = "articles";
	
	@Bean
	public RedisCacheManager cacheManager(RedisConnectionFactory factory) {
		var jsonSerializer = RedisSerializationContext.SerializationPair
			.fromSerializer(RedisSerializer.json());
		
		var defaultConfig = RedisCacheConfiguration.defaultCacheConfig()
			.entryTtl(Duration.ofMinutes(10))
			.serializeValuesWith(jsonSerializer)
			.disableCachingNullValues();
		
		var cacheConfigs = Map.of(
			CACHE_CATEGORIES, defaultConfig.entryTtl(Duration.ofHours(1)),
			CACHE_BRANDS, defaultConfig.entryTtl(Duration.ofHours(1)),
			CACHE_COLORS, defaultConfig.entryTtl(Duration.ofHours(24)),
			CACHE_PRODUCTS, defaultConfig.entryTtl(Duration.ofMinutes(5)),
			CACHE_ARTICLES, defaultConfig.entryTtl(Duration.ofMinutes(15))
		);
		
		return RedisCacheManager.builder(factory)
			.cacheDefaults(defaultConfig)
			.withInitialCacheConfigurations(cacheConfigs)
			.build();
	}
}