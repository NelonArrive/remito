package dev.remito.user;

import dev.remito.exception.AlreadyExistsException;
import dev.remito.exception.ResourceNotFoundException;
import dev.remito.exception.TokenRefreshException;
import dev.remito.exception.UnauthorizedException;
import dev.remito.security.CookieUtil;
import dev.remito.security.RefreshToken;
import dev.remito.security.RefreshTokenService;
import dev.remito.security.jwt.JwtService;
import dev.remito.user.auth.AuthResponse;
import dev.remito.user.auth.LoginRequest;
import dev.remito.user.auth.MessageResponse;
import dev.remito.user.auth.SignupRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {
	
	private final AuthenticationManager authenticationManager;
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	private final RefreshTokenService refreshTokenService;
	private final CookieUtil cookieUtil;
	
	public AuthResponse login(LoginRequest request, HttpServletResponse response) {
		try {
			Authentication auth = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(request.email, request.password)
			);
			
			SecurityContextHolder.getContext().setAuthentication(auth);
			
			User user = (User) auth.getPrincipal();
			
			String accessToken = jwtService.generateAccessToken(user);
			String refreshToken = refreshTokenService.createRefreshToken(user.getId());
			
			cookieUtil.setAccessTokenCookie(response, accessToken);
			cookieUtil.setRefreshTokenCookie(response, refreshToken);
			
			log.info("Login: {}", user.getEmail());
			return new AuthResponse(user.getId(), user.getEmail(), user.getName());
			
		} catch (BadCredentialsException ex) {
			throw new UnauthorizedException("Invalid email or password");
		} catch (UsernameNotFoundException ex) {
			throw new ResourceNotFoundException("User not found");
		}
	}
	
	public MessageResponse signup(SignupRequest request) {
		if (userRepository.existsByEmail(request.email)) {
			throw new AlreadyExistsException("Email already in use");
		}
		
		User user = User.builder()
			.email(request.email)
			.password(passwordEncoder.encode(request.password))
			.name(request.name)
			.provider("local")
			.build();
		
		userRepository.save(user);
		log.info("Signup: {}", user.getEmail());
		return new MessageResponse("Registered successfully");
	}
	
	public MessageResponse refreshToken(HttpServletRequest request, HttpServletResponse response) {
		String oldToken = cookieUtil.getRefreshTokenFromCookie(request)
			.orElseThrow(() -> new TokenRefreshException("Refresh token not found"));
		
		RefreshToken tokenEntity = refreshTokenService.verifyExpiration(oldToken);
		
		User user = userRepository.findById(tokenEntity.getUserId())
			.orElseThrow(() -> new ResourceNotFoundException("User not found"));
		
		String newAccess = jwtService.generateAccessToken(user.getId(), user.getEmail(), user.getName());
		String newRefresh = refreshTokenService.rotateRefreshToken(oldToken);
		
		cookieUtil.setAccessTokenCookie(response, newAccess);
		cookieUtil.setRefreshTokenCookie(response, newRefresh);
		
		log.info("Token refreshed: {}", user.getEmail());
		return new MessageResponse("Token refreshed");
	}
	
	public MessageResponse logout(HttpServletRequest request, HttpServletResponse response) {
		cookieUtil.getRefreshTokenFromCookie(request)
			.ifPresent(refreshTokenService::deleteByToken);
		cookieUtil.deleteAllTokenCookies(response);
		log.info("Logout");
		return new MessageResponse("Logged out");
	}
	
	public User getCurrentUser() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (auth == null || !auth.isAuthenticated() || "anonymousUser".equals(auth.getPrincipal())) {
			throw new UnauthorizedException("Not authenticated");
		}
		User user = (User) auth.getPrincipal();
		return userRepository.findById(user.getId())
			.orElseThrow(() -> new ResourceNotFoundException("User not found"));
	}
}