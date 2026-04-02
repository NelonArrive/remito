package dev.remito.user.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class SignupRequest {
	@NotBlank
	public String name;
	
	@Email
	@NotBlank
	public String email;
	
	@NotBlank @Size(min = 6)
	public String password;
}