package dev.remito.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * Настройки объектного хранилища Cloudflare R2.
 * Значения берутся из application.yml под ключом storage.r2.
 */
@Data
@Component
@ConfigurationProperties(prefix = "storage.r2")
public class R2Properties {
	
	/** S3 endpoint R2, например: https://<accountId>.r2.cloudflarestorage.com */
	private String endpoint;
	
	/** Access Key ID из R2 API Token */
	private String accessKey;
	
	/** Secret Access Key из R2 API Token */
	private String secretKey;
	
	/** Имя бакета, например: remito-products */
	private String bucket;
	
	/** Для R2 всегда "auto" */
	private String region = "auto";
	
	/**
	 * Папка-префикс внутри бакета, куда кладутся файлы (например images/products).
	 * Можно оставить пустым.
	 */
	private String prefix = "";
	
	/**
	 * Необязательно: публичный домен бакета (например https://media.example.com).
	 * Если задан — в url подставляется этот домен. Если нет — фото отдаются
	 * через наш собственный endpoint GET /files/{key}.
	 */
	private String publicBaseUrl;
}
