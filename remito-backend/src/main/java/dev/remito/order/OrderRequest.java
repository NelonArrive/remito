package dev.remito.order;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record OrderRequest(
	@NotBlank String customerName,
	@NotBlank @Email String customerEmail,
	@NotBlank String customerPhone,
	@NotNull PayerType payerType,
	@NotNull PaymentMethod paymentMethod,
	String comment,
	String pickupPoint,
	String address
) {}