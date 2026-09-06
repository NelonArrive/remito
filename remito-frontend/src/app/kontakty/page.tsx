import { KontaktyPage } from "@/views/KontaktyPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Контакты — Remito | Ремонт оргтехники в Екатеринбурге",
	description:
		"Свяжитесь с Remito: телефон, email, Telegram, WhatsApp и реквизиты. Работаем ежедневно с 9:00 до 21:00.",
	openGraph: {
		title: "Контакты — Remito",
		description:
			"Телефон, мессенджеры и реквизиты сервиса по ремонту оргтехники.",
		url: "https://remito.ru/kontakty/",
	},
};

export default function Page() {
	return <KontaktyPage />;
}
