package dev.remito.order;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false, unique = true)
	private String orderNumber;
	
	@Column(nullable = false)
	private String customerName;
	
	@Column(nullable = false)
	private String customerEmail;
	
	@Column(nullable = false)
	private String customerPhone;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	@Builder.Default
	private PayerType payerType = PayerType.INDIVIDUAL;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	@Builder.Default
	private PaymentMethod paymentMethod = PaymentMethod.CASH;
	
	private String comment;
	private String pickupPoint;
	private String address;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	@Builder.Default
	private OrderStatus status = OrderStatus.NEW;
	
	@Column(nullable = false)
	private BigDecimal totalAmount;
	
	@OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
	@Builder.Default
	private List<OrderItem> items = new ArrayList<>();
	
	@Column(nullable = false, updatable = false)
	@Builder.Default
	private LocalDateTime createdAt = LocalDateTime.now();
}