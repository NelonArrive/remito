package dev.remito.security;

import dev.remito.security.jwt.JwtAuthFilter;
import dev.remito.security.oauth2.OAuth2SuccessHandler;
import dev.remito.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {
	
	private final JwtAuthFilter jwtAuthFilter;
	private final OAuth2SuccessHandler oauth2SuccessHandler;
	private final UserRepository userRepository;
	
	private static final String[] PUBLIC_GET = {
		"/api/v1/products/**",
		"/api/v1/categories/**",
		"/api/v1/brands/**",
		"/api/v1/colors/**",
		"/api/v1/services/**",
		"/api/v1/articles/**",
		"/swagger-ui/**",
		"/v3/api-docs/**"
	};
	
	private static final String[] PUBLIC_POST = {
		"/api/v1/auth/**",
		"/api/v1/cart/**",
		"/api/v1/orders",
	};
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
			.csrf(AbstractHttpConfigurer::disable)
			.sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
			.authorizeHttpRequests(auth -> auth
				.requestMatchers(HttpMethod.GET,  PUBLIC_GET).permitAll()
				.requestMatchers(HttpMethod.POST, PUBLIC_POST).permitAll()
				.anyRequest().hasAnyRole("ADMIN", "MANAGER")
			)
			.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
			.oauth2Login(oauth -> oauth
				.successHandler(oauth2SuccessHandler)
				.failureUrl("/api/v1/auth/oauth2/failure")
			);
		
		return http.build();
	}
	
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
}
