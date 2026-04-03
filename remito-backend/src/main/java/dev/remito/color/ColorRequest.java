package dev.remito.color;

import jakarta.validation.constraints.NotBlank;

public record ColorRequest(
	@NotBlank String name,
	@NotBlank String hexCode
) {}