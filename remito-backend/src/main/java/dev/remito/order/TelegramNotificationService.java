package dev.remito.order;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class TelegramNotificationService {
	
	private final RestClient restClient = RestClient.create();
	
	@Value("${app.telegram.bot-token}")
	private String botToken;
	
	@Value("${app.telegram.chat-id}")
	private String chatId;
	
	public void sendMessage(String text) {
		try {
			String url = "https://api.telegram.org/bot" + botToken + "/sendMessage";
			
			restClient.post()
				.uri(url)
				.body(Map.of(
					"chat_id", chatId,
					"text", text,
					"parse_mode", "HTML"
				))
				.retrieve()
				.toBodilessEntity();
			
			log.info("Telegram message sent to chat {}", chatId);
		} catch (Exception e) {
			log.error("Failed to send Telegram message: {}", e.getMessage());
		}
	}
	
	public String buildOrderMessage(Order order) {
		StringBuilder sb = new StringBuilder();
		sb.append("<b>🛒 Новый заказ ").append(order.getOrderNumber()).append("</b>\n\n");
		sb.append("👤 <b>Клиент:</b> ").append(order.getCustomerName()).append("\n");
		sb.append("📧 <b>Email:</b> ").append(order.getCustomerEmail()).append("\n");
		sb.append("📞 <b>Телефон:</b> ").append(order.getCustomerPhone()).append("\n");
		sb.append("💼 <b>Плательщик:</b> ")
			.append(order.getPayerType() == PayerType.INDIVIDUAL ? "Частное лицо" : "Юридическое лицо")
			.append("\n");
		sb.append("💳 <b>Оплата:</b> ").append(order.getPaymentMethod().name()).append("\n");
		
		if (order.getPickupPoint() != null)
			sb.append("📍 <b>Пункт выдачи:</b> ").append(order.getPickupPoint()).append("\n");
		if (order.getAddress() != null)
			sb.append("🏠 <b>Адрес:</b> ").append(order.getAddress()).append("\n");
		if (order.getComment() != null)
			sb.append("💬 <b>Комментарий:</b> ").append(order.getComment()).append("\n");
		
		sb.append("\n<b>--- Товары ---</b>\n");
		for (OrderItem item : order.getItems()) {
			sb.append("• ").append(item.getNameSnapshot())
				.append(" x").append(item.getQuantity())
				.append(" = ").append(
					item.getPriceSnapshot().multiply(java.math.BigDecimal.valueOf(item.getQuantity())))
				.append(" руб.\n");
		}
		sb.append("\n💰 <b>ИТОГО: ").append(order.getTotalAmount()).append(" руб.</b>");
		return sb.toString();
	}
}