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
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {
	
	@Mock
	AuthenticationManager authenticationManager;
	@Mock
	UserRepository userRepository;
	@Mock
	PasswordEncoder passwordEncoder;
	@Mock
	JwtService jwtService;
	@Mock
	RefreshTokenService refreshTokenService;
	@Mock
	CookieUtil cookieUtil;
	@Mock
	HttpServletRequest httpRequest;
	@Mock
	HttpServletResponse httpResponse;
	@Mock
	Authentication authentication;
	@Mock
	SecurityContext securityContext;
	
	@InjectMocks
	AuthService authService;
	
	private User user;
	
	@BeforeEach
	void setUp() {
		user = User.builder()
			.id(1L)
			.email("ivan@mail.ru")
			.password("encoded_password")
			.name("Иван")
			.role(Role.MANAGER)
			.provider("local")
			.build();
		
		SecurityContextHolder.setContext(securityContext);
	}
	
	@Test
	@DisplayName("login —  returns AuthResponse and sets cookies")
	void login_returnsAuthResponse_andSetsCookies() {
		var request = new LoginRequest();
		request.email = "ivan@mail.ru";
		request.password = "secret123";
		
		when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
			.thenReturn(authentication);
		when(authentication.getPrincipal()).thenReturn(user);
		when(jwtService.generateAccessToken(user)).thenReturn("access-token");
		when(refreshTokenService.createRefreshToken(1L)).thenReturn("refresh-token");
		
		AuthResponse result = authService.login(request, httpResponse);
		
		assertThat(result.id()).isEqualTo(1L);
		assertThat(result.email()).isEqualTo("ivan@mail.ru");
		assertThat(result.name()).isEqualTo("Иван");
		
		verify(cookieUtil).setAccessTokenCookie(httpResponse, "access-token");
		verify(cookieUtil).setRefreshTokenCookie(httpResponse, "refresh-token");
		verify(securityContext).setAuthentication(authentication);
	}
	
	@Test
	@DisplayName("login —  throws when bad credentials")
	void login_throws_whenBadCredentials() {
		var request = new LoginRequest();
		request.email = "ivan@mail.ru";
		request.password = "wrong";
		
		when(authenticationManager.authenticate(any()))
			.thenThrow(new BadCredentialsException("Bad credentials"));
		
		assertThatThrownBy(() -> authService.login(request, httpResponse))
			.isInstanceOf(BadCredentialsException.class);
		
		verify(cookieUtil, never()).setAccessTokenCookie(any(), any());
	}
	
	@Test
	@DisplayName("signup —  register user and returns MessageResponse")
	void signup_registersUser_andReturnsMessage() {
		var request = new SignupRequest();
		request.email = "new@mail.ru";
		request.password = "secret123";
		request.name = "Новый";
		
		when(userRepository.existsByEmail("new@mail.ru")).thenReturn(false);
		when(passwordEncoder.encode("secret123")).thenReturn("encoded");
		
		MessageResponse result = authService.signup(request);
		
		assertThat(result.message()).isEqualTo("Registered successfully");
		verify(userRepository).save(any(User.class));
	}
	
	@Test
	@DisplayName("signup —  throws AlreadyExistsException when email taken")
	void signup_throwsAlreadyExists_whenEmailTaken() {
		var request = new SignupRequest();
		request.email = "ivan@mail.ru";
		request.password = "secret123";
		request.name = "Иван";
		
		when(userRepository.existsByEmail("ivan@mail.ru")).thenReturn(true);
		
		assertThatThrownBy(() -> authService.signup(request))
			.isInstanceOf(AlreadyExistsException.class)
			.hasMessageContaining("Email already in use");
		
		verify(userRepository, never()).save(any());
	}
	
	@Test
	@DisplayName("signup —  saves encoded password")
	void signup_savesEncodedPassword() {
		var request = new SignupRequest();
		request.email = "new@mail.ru";
		request.password = "secret123";
		request.name = "Новый";
		
		when(userRepository.existsByEmail("new@mail.ru")).thenReturn(false);
		when(passwordEncoder.encode("secret123")).thenReturn("encoded_password");
		
		authService.signup(request);
		
		verify(userRepository).save(argThat(u -> "encoded_password".equals(u.getPassword())));
	}
	
	@Test
	@DisplayName("refreshToken —  rotates tokens and sets cookies")
	void refreshToken_rotatesTokens_andSetsCookies() {
		RefreshToken tokenEntity = RefreshToken.builder()
			.token("old-refresh").userId(1L).build();
		
		when(cookieUtil.getRefreshTokenFromCookie(httpRequest))
			.thenReturn(Optional.of("old-refresh"));
		when(refreshTokenService.verifyExpiration("old-refresh")).thenReturn(tokenEntity);
		when(userRepository.findById(1L)).thenReturn(Optional.of(user));
		when(jwtService.generateAccessToken(1L, "ivan@mail.ru", "Иван")).thenReturn("new-access");
		when(refreshTokenService.rotateRefreshToken("old-refresh")).thenReturn("new-refresh");
		
		MessageResponse result = authService.refreshToken(httpRequest, httpResponse);
		
		assertThat(result.message()).isEqualTo("Token refreshed");
		verify(cookieUtil).setAccessTokenCookie(httpResponse, "new-access");
		verify(cookieUtil).setRefreshTokenCookie(httpResponse, "new-refresh");
	}
	
	@Test
	@DisplayName("refreshToken —  throws TokenRefreshException when no cookie")
	void refreshToken_throws_whenNoCookie() {
		when(cookieUtil.getRefreshTokenFromCookie(httpRequest)).thenReturn(Optional.empty());
		
		assertThatThrownBy(() -> authService.refreshToken(httpRequest, httpResponse))
			.isInstanceOf(TokenRefreshException.class)
			.hasMessageContaining("Refresh token not found");
	}
	
	@Test
	@DisplayName("refreshToken —  throws ResourceNotFoundException when user not found")
	void refreshToken_throws_whenUserNotFound() {
		RefreshToken tokenEntity = RefreshToken.builder()
			.token("old-refresh").userId(99L).build();
		
		when(cookieUtil.getRefreshTokenFromCookie(httpRequest))
			.thenReturn(Optional.of("old-refresh"));
		when(refreshTokenService.verifyExpiration("old-refresh")).thenReturn(tokenEntity);
		when(userRepository.findById(99L)).thenReturn(Optional.empty());
		
		assertThatThrownBy(() -> authService.refreshToken(httpRequest, httpResponse))
			.isInstanceOf(ResourceNotFoundException.class);
	}
	
	@Test
	@DisplayName("logout —  deletes refresh token and clears cookies")
	void logout_deletesToken_andClearsCookies() {
		when(cookieUtil.getRefreshTokenFromCookie(httpRequest))
			.thenReturn(Optional.of("refresh-token"));
		
		MessageResponse result = authService.logout(httpRequest, httpResponse);
		
		assertThat(result.message()).isEqualTo("Logged out");
		verify(refreshTokenService).deleteByToken("refresh-token");
		verify(cookieUtil).deleteAllTokenCookies(httpResponse);
	}
	
	@Test
	@DisplayName("logout —  works no cookies")
	void logout_works_whenNoCookie() {
		when(cookieUtil.getRefreshTokenFromCookie(httpRequest)).thenReturn(Optional.empty());
		
		assertThatNoException().isThrownBy(() -> authService.logout(httpRequest, httpResponse));
		
		verify(refreshTokenService, never()).deleteByToken(any());
		verify(cookieUtil).deleteAllTokenCookies(httpResponse);
	}
	
	@Test
	@DisplayName("getCurrentUser —  returns user when authenticated")
	void getCurrentUser_returnsUser_whenAuthenticated() {
		when(securityContext.getAuthentication()).thenReturn(authentication);
		when(authentication.isAuthenticated()).thenReturn(true);
		when(authentication.getPrincipal()).thenReturn(user);
		when(userRepository.findById(1L)).thenReturn(Optional.of(user));
		
		User result = authService.getCurrentUser();
		
		assertThat(result.getEmail()).isEqualTo("ivan@mail.ru");
	}
	
	@Test
	@DisplayName("getCurrentUser —  throws UnauthorizedException when not authenticated")
	void getCurrentUser_throws_whenNotAuthenticated() {
		when(securityContext.getAuthentication()).thenReturn(null);
		
		assertThatThrownBy(() -> authService.getCurrentUser())
			.isInstanceOf(UnauthorizedException.class)
			.hasMessageContaining("Not authenticated");
	}
	
	@Test
	@DisplayName("getCurrentUser —  throws UnauthorizedException when anonymous")
	void getCurrentUser_throws_whenAnonymous() {
		when(securityContext.getAuthentication()).thenReturn(authentication);
		when(authentication.isAuthenticated()).thenReturn(true);
		when(authentication.getPrincipal()).thenReturn("anonymousUser");
		
		assertThatThrownBy(() -> authService.getCurrentUser())
			.isInstanceOf(UnauthorizedException.class);
	}
	
	@Test
	@DisplayName("getCurrentUser —  throws ResourceNotFoundException when user not found in DB")
	void getCurrentUser_throws_whenUserNotFoundInDb() {
		when(securityContext.getAuthentication()).thenReturn(authentication);
		when(authentication.isAuthenticated()).thenReturn(true);
		when(authentication.getPrincipal()).thenReturn(user);
		when(userRepository.findById(1L)).thenReturn(Optional.empty());
		
		assertThatThrownBy(() -> authService.getCurrentUser())
			.isInstanceOf(ResourceNotFoundException.class)
			.hasMessageContaining("User not found");
	}
}