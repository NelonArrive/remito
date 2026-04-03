package dev.remito.product;

import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class ProductSpecification {
	static Specification<Product> build(ProductFilter f) {
		return (root, query, cb) -> {
			List<Predicate> predicates = new ArrayList<>();
			
			predicates.add(cb.isTrue(root.get("isActive")));
			
			if (f.categoryId() != null)
				predicates.add(cb.equal(root.get("category").get("id"), f.categoryId()));
			
			if (f.brandId() != null)
				predicates.add(cb.equal(root.get("brand").get("id"), f.brandId()));
			
			if (f.colorId() != null)
				predicates.add(cb.equal(root.get("color").get("id"), f.colorId()));
			
			if (f.priceFrom() != null)
				predicates.add(cb.greaterThanOrEqualTo(root.get("price"), f.priceFrom()));
			
			if (f.priceTo() != null)
				predicates.add(cb.lessThanOrEqualTo(root.get("price"), f.priceTo()));
			
			if (Boolean.TRUE.equals(f.inStock()))
				predicates.add(cb.greaterThan(root.get("stockQuantity"), 0));
			
			// Сортировка
			boolean asc = "asc".equalsIgnoreCase(f.sortDir());
			var order = asc
				? cb.asc(root.get(f.sortBy()))
				: cb.desc(root.get(f.sortBy()));
			query.orderBy(order);
			
			return cb.and(predicates.toArray(new Predicate[0]));
		};
	}
}
