package dev.remito.user;

import dev.remito.user.auth.AuthResponse;
import dev.remito.user.auth.LoginRequest;
import dev.remito.user.auth.MessageResponse;
import dev.remito.user.auth.SignupRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/auth")
@RequiredArgsConstructor
public class AuthController {
	
	private final AuthService authService;
	private final UserMapper userMapper;
	
	@PostMapping("/login")
	public ResponseEntity<AuthResponse> login(
		@Valid @RequestBody LoginRequest request,
		HttpServletResponse response
	) {
		return ResponseEntity.ok(authService.login(request, response));
	}
	
	@PostMapping("/signup")
	public ResponseEntity<MessageResponse> signup(@Valid @RequestBody SignupRequest request) {
		return ResponseEntity.ok(authService.signup(request));
	}
	
	@PostMapping("/refresh")
	public ResponseEntity<MessageResponse> refresh(
		HttpServletRequest request,
		HttpServletResponse response
	) {
		return ResponseEntity.ok(authService.refreshToken(request, response));
	}
	
	@PostMapping("/logout")
	public ResponseEntity<MessageResponse> logout(
		HttpServletRequest request,
		HttpServletResponse response
	) {
		return ResponseEntity.ok(authService.logout(request, response));
	}
	
	@GetMapping("/me")
	public ResponseEntity<UserDto> me() {
		User saved = authService.getCurrentUser();
		return ResponseEntity.ok(userMapper.toDto(saved));
	}
	
}
