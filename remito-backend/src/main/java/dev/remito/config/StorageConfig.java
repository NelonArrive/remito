package dev.remito.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.S3Configuration;

import java.net.URI;

@Configuration
public class StorageConfig {
	
	@Bean
	public S3Client s3Client(R2Properties props) {
		return S3Client.builder()
			.region(Region.of(props.getRegion()))
			.endpointOverride(URI.create(props.getEndpoint()))
			.credentialsProvider(StaticCredentialsProvider.create(
				AwsBasicCredentials.create(props.getAccessKey(), props.getSecretKey())))
			// R2 требует path-style доступа
			.serviceConfiguration(S3Configuration.builder()
				.pathStyleAccessEnabled(true)
				.build())
			.build();
	}
}
