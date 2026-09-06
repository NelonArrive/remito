import { AboutPage } from "@/views/AboutPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "О компании — Remito | Ремонт оргтехники в Екатеринбурге",
	description:
		"Remito — сервис по ремонту принтеров, МФУ и ноутбуков с 2016 года. Работаем честно, с гарантией на работы и бесплатной диагностикой.",
	openGraph: {
		title: "О компании —  Remito",
		description:
			"Ремонтируем оргтехнику с 2016 года. Диагностика бесплатно, гарантия на работы.",
		url: "https://remito.ru/o-kompanii/",
	},
};

export default function Page() {
	return <AboutPage />;
}
