package dev.remito.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
	
	@Bean
	public OpenAPI openAPI() {
		return new OpenAPI()
			.info(new Info()
				.title("Remito API")
				.description("API интернет-магазина расходных материалов и услуг")
				.version("1.0.0")
				.contact(new Contact()
					.name("Remito")
					.email("admin@remito.dev")))
			.addSecurityItem(new SecurityRequirement().addList("cookieAuth"))
			.components(new Components()
				.addSecuritySchemes("cookieAuth", new SecurityScheme()
					.type(SecurityScheme.Type.APIKEY)
					.in(SecurityScheme.In.COOKIE)
					.name("access_token")));
	}
	
}
