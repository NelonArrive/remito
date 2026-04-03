package dev.remito.order;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
	Optional<Order> findByOrderNumber(String orderNumber);
	
	@Query("SELECT COALESCE(MAX(o.id), 0) FROM Order o")
	Long findMaxId();
	
	List<Order> findAllByOrderByCreatedAtDesc();
}