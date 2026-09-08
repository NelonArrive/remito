package dev.remito.file;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.ResponseBytes;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import org.springframework.http.CacheControl;
import java.time.Duration;

@RestController
@RequestMapping("${api.prefix}/files")
@RequiredArgsConstructor
public class FileController {
	
	private final FileStorageService fileStorageService;
	
	@PostMapping
	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
	public ResponseEntity<FileDto> upload(@RequestParam("file") MultipartFile file) {
		return ResponseEntity.status(HttpStatus.CREATED).body(fileStorageService.upload(file));
	}

	@GetMapping("/{key:.+}")
	public ResponseEntity<byte[]> get(@PathVariable String key) {
		ResponseBytes<GetObjectResponse> object = fileStorageService.download(key);
		GetObjectResponse resp = object.response();
		byte[] body = object.asByteArray();
		
		MediaType mediaType = resp.contentType() != null
			? MediaType.parseMediaType(resp.contentType())
			: MediaType.APPLICATION_OCTET_STREAM;
		
		return ResponseEntity.ok()
			.contentType(mediaType)
			.contentLength(body.length)
			.cacheControl(
				CacheControl.maxAge(Duration.ofDays(365))
					.cachePublic()
					.immutable()
			)
			.body(body);
	}
	
	@DeleteMapping("/{key:.+}")
	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
	public ResponseEntity<Void> delete(@PathVariable String key) {
		fileStorageService.delete(key);
		return ResponseEntity.noContent().build();
	}
}