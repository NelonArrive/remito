package dev.remito.order;

import dev.remito.product.Product;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "order_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
class OrderItem {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "order_id", nullable = false)
	private Order order;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "product_id")
	private Product product;
	
	@Column(nullable = false)
	private String nameSnapshot;
	
	@Column(nullable = false)
	private BigDecimal priceSnapshot;
	
	@Column(nullable = false)
	@Builder.Default
	private Integer quantity = 1;
}