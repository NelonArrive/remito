package dev.remito.file;

import dev.remito.config.R2Properties;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.ResponseBytes;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;

import java.io.IOException;
import java.io.InputStream;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileStorageService {
	
	private static final Map<String, String> ALLOWED_TYPES = Map.of(
		"image/jpeg", "jpg",
		"image/png", "png",
		"image/webp", "webp",
		"image/gif", "gif"
	);
	
	private static final long MAX_SIZE = 10L * 1024 * 1024; // 10 МБ
	
	private final S3Client s3Client;
	private final R2Properties props;
	
	@Value("${api.prefix:}")
	private String apiPrefix;
	
	public FileDto upload(MultipartFile file) {
		if (file == null || file.isEmpty()) {
			throw new IllegalArgumentException("Файл не передан или пустой");
		}
		if (file.getSize() > MAX_SIZE) {
			throw new IllegalArgumentException("Размер файла превышает " + (MAX_SIZE / (1024 * 1024)) + " МБ");
		}
		
		String contentType = file.getContentType();
		if (contentType == null || !ALLOWED_TYPES.containsKey(contentType)) {
			throw new IllegalArgumentException("Неподдерживаемый тип файла: " + contentType);
		}
		
		String extension = ALLOWED_TYPES.get(contentType);
		String key = buildKey(extension);
		String originalName = StringUtils.cleanPath(
			file.getOriginalFilename() == null ? key : file.getOriginalFilename());
		
		try (InputStream in = file.getInputStream()) {
			PutObjectRequest request = PutObjectRequest.builder()
				.bucket(props.getBucket())
				.key(key)
				.contentType(contentType)
				.contentLength(file.getSize())
				.build();
			s3Client.putObject(request, RequestBody.fromInputStream(in, file.getSize()));
		} catch (IOException e) {
			throw new RuntimeException("Ошибка чтения файла", e);
		} catch (S3Exception e) {
			throw new RuntimeException("Ошибка загрузки в R2: " + e.awsErrorDetails().errorMessage(), e);
		}
		
		return new FileDto(key, buildUrl(key), contentType, file.getSize(), originalName);
	}
	
	public ResponseBytes<GetObjectResponse> download(String key) {
		try {
			return s3Client.getObject(GetObjectRequest.builder()
					.bucket(props.getBucket())
					.key(key)
					.build(),
				software.amazon.awssdk.core.sync.ResponseTransformer.toBytes());
		} catch (S3Exception e) {
			throw new RuntimeException("Файл не найден в R2", e);
		}
	}
	
	public void delete(String key) {
		try {
			s3Client.deleteObject(DeleteObjectRequest.builder()
				.bucket(props.getBucket())
				.key(key)
				.build());
		} catch (S3Exception e) {
			throw new RuntimeException("Ошибка удаления из R2: " + e.awsErrorDetails().errorMessage(), e);
		}
	}
	
	// --- helpers ---
	
	private String buildKey(String extension) {
		String id = UUID.randomUUID().toString();
		String prefix = props.getPrefix();
		if (StringUtils.hasText(prefix)) {
			prefix = StringUtils.trimTrailingCharacter(prefix, '/') + "/";
		} else {
			prefix = "";
		}
		return prefix + id + "." + extension;
	}
	
	private String buildUrl(String key) {
		String publicBase = props.getPublicBaseUrl();
		if (StringUtils.hasText(publicBase)) {
			return StringUtils.trimTrailingCharacter(publicBase, '/') + "/" + key;
		}

		return "/" + apiPrefix + "/files/" + key;
	}
	
	public static Set<String> allowedTypes() {
		return ALLOWED_TYPES.keySet();
	}
}
