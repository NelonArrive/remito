package dev.remito.brand;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BrandRepository extends JpaRepository<Brand, Long> {
	boolean existsByName(String name);
}
