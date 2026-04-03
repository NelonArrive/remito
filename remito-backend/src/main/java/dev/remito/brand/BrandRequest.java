package dev.remito.brand;

import jakarta.validation.constraints.NotBlank;

public record BrandRequest(
	@NotBlank String name,
	String logoUrl
) {
}