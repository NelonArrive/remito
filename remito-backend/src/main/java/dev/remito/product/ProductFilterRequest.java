package dev.remito.product;

import java.math.BigDecimal;

public class ProductFilterRequest {
	private Long categoryId;
	private Long brandId;
	private Long colorId;
	private BigDecimal priceFrom;
	private BigDecimal priceTo;
	private Boolean inStock;
	private String sortBy;
	private String sortDir;
	private int page;
	private int size;
}
