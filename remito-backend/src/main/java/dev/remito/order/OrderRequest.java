package dev.remito.order;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record OrderRequest(
	@NotBlank(message = "Name is required")
	@Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
	String customerName,
	
	@NotBlank(message = "Email is required")
	@Email(message = "Invalid email format")
	String customerEmail,
	
	@NotBlank(message = "Phone is required")
	String customerPhone,
	
	@NotNull(message = "Payer type is required")
	PayerType payerType,
	
	@NotNull(message = "Payment method is required")
	PaymentMethod paymentMethod,
	
	@Size(max = 500, message = "Comment must not exceed 500 characters")
	String comment,
	
	@Size(max = 255, message = "Pickup point must not exceed 255 characters")
	String pickupPoint,
	
	@Size(max = 500, message = "Address must not exceed 500 characters")
	String address
) {
}