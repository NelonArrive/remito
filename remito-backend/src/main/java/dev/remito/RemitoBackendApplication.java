package dev.remito;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
@EnableRedisRepositories(basePackages = "dev.remito.security")
@EnableJpaRepositories(basePackages = {
	"dev.remito.user",
	"dev.remito.product",
	"dev.remito.category",
	"dev.remito.brand",
	"dev.remito.cart",
	"dev.remito.order",
	"dev.remito.article",
	"dev.remito.color"
})
public class RemitoBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(RemitoBackendApplication.class, args);
	}

}
