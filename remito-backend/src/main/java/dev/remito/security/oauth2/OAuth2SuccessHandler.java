package dev.remito.security.oauth2;

import dev.remito.security.RefreshTokenService;
import dev.remito.security.CookieUtil;
import dev.remito.security.jwt.JwtService;
import dev.remito.user.Role;
import dev.remito.user.User;
import dev.remito.user.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jspecify.annotations.NonNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
	
	private final UserRepository userRepository;
	private final JwtService jwtService;
	private final RefreshTokenService refreshTokenService;
	private final CookieUtil cookieUtil;
	
	@Value("${app.frontend-url}")
	private String frontendUrl;
	
	@Override
	public void onAuthenticationSuccess(
		@NonNull HttpServletRequest request,
		@NonNull HttpServletResponse response,
		@NonNull FilterChain chain,
		@NonNull Authentication authentication
	) throws IOException, ServletException {
		super.onAuthenticationSuccess(request, response, chain, authentication);
		
		OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
		
		String email = oauth2User.getAttribute("email");
		String name = oauth2User.getAttribute("name");
		String provider = resolveProvider(request);
		
		User user = userRepository.findByEmail(email)
			.orElseGet(() -> userRepository.save(
				User.builder()
					.email(email)
					.name(name)
					.provider(provider)
					.role(Role.MANAGER)
					.build()
			));
		
		String accessToken  = jwtService.generateAccessToken(user.getId(), user.getEmail(), user.getName());
		String refreshToken = refreshTokenService.createRefreshToken(user.getId());
		
		cookieUtil.setAccessTokenCookie(response, accessToken);
		cookieUtil.setRefreshTokenCookie(response, refreshToken);
		
		log.info("OAuth2 login success: {} via {}", email, provider);
		
		getRedirectStrategy().sendRedirect(request, response, frontendUrl + "/oauth2/callback");
	}
	
	private String resolveProvider(HttpServletRequest request) {
		String uri = request.getRequestURI();
		if (uri.contains("google")) return "google";
		if (uri.contains("yandex")) return "yandex";
		return "unknown";
	}
}
