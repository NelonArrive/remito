import { ServicesPage } from "@/views/ServicesPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Услуги — Remito | Ремонт оргтехники в Екатеринбурге",
	description:
		"Ремонт принтеров, МФУ, ноутбуков и компьютеров. Заправка картриджей, установка Windows, восстановление данных. Выезд в удобное время.",
	openGraph: {
		title: "Услуги — Remito",
		description: "Все услуги по ремонту оргтехники в Екатеринбурге.",
		url: "https://remito.ru/uslugi/",
	},
};

export default function Page() {
	return <ServicesPage />;
}
