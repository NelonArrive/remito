package dev.remito.order;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderNotificationService {
	
	private final JavaMailSender mailSender;
	
	@Value("${app.mail.to}")
	private String adminEmail;
	
	@Value("${spring.mail.username}")
	private String fromEmail;
	
	@Async
	public void sendOrderNotification(Order order) {
		try {
			// Письмо администратору
			sendToAdmin(order);
			// Письмо клиенту
			sendToCustomer(order);
		} catch (Exception e) {
			log.error("Failed to send order notification for {}: {}", order.getOrderNumber(), e.getMessage());
		}
	}
	
	private void sendToAdmin(Order order) {
		SimpleMailMessage msg = new SimpleMailMessage();
		msg.setFrom(fromEmail);
		msg.setTo(adminEmail);
		msg.setSubject("Новый заказ " + order.getOrderNumber());
		msg.setText(buildAdminText(order));
		mailSender.send(msg);
		log.info("Admin notification sent for order {}", order.getOrderNumber());
	}
	
	private void sendToCustomer(Order order) {
		SimpleMailMessage msg = new SimpleMailMessage();
		msg.setFrom(fromEmail);
		msg.setTo(order.getCustomerEmail());
		msg.setSubject("Ваш заказ " + order.getOrderNumber() + " принят");
		msg.setText(buildCustomerText(order));
		mailSender.send(msg);
		log.info("Customer notification sent for order {}", order.getOrderNumber());
	}
	
	private String buildAdminText(Order order) {
		StringBuilder sb = new StringBuilder();
		sb.append("=== НОВЫЙ ЗАКАЗ ===\n\n");
		sb.append("Номер: ").append(order.getOrderNumber()).append("\n");
		sb.append("Клиент: ").append(order.getCustomerName()).append("\n");
		sb.append("Email: ").append(order.getCustomerEmail()).append("\n");
		sb.append("Телефон: ").append(order.getCustomerPhone()).append("\n");
		sb.append("Плательщик: ").append(order.getPayerType() == PayerType.INDIVIDUAL ? "Частное лицо" : "Юридическое лицо")
			.append("\n");
		sb.append("Оплата: ").append(order.getPaymentMethod().name()).append("\n");
		
		if (order.getPickupPoint() != null)
			sb.append("Пункт выдачи: ").append(order.getPickupPoint()).append("\n");
		if (order.getAddress() != null)
			sb.append("Адрес: ").append(order.getAddress()).append("\n");
		if (order.getComment() != null)
			sb.append("Комментарий: ").append(order.getComment()).append("\n");
		
		sb.append("\n--- Товары ---\n");
		for (OrderItem item : order.getItems()) {
			sb.append("• ").append(item.getNameSnapshot())
				.append(" x").append(item.getQuantity())
				.append(" = ").append(item.getPriceSnapshot().multiply(java.math.BigDecimal.valueOf(item.getQuantity())))
				.append(" руб.\n");
		}
		sb.append("\nИТОГО: ").append(order.getTotalAmount()).append(" руб.");
		return sb.toString();
	}
	
	private String buildCustomerText(Order order) {
		return "Здравствуйте, " + order.getCustomerName() + "!\n\n" +
			"Ваш заказ " + order.getOrderNumber() + " успешно принят.\n" +
			"Сумма заказа: " + order.getTotalAmount() + " руб.\n\n" +
			"Мы свяжемся с вами в ближайшее время.\n\n" +
			"Remito";
	}
}