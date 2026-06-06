import { ProductsPage } from "@/views/ProductsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Картриджи и расходники — Remito | Екатеринбург",
	description:
		"Оригинальные и совместимые картриджи для принтеров Canon, HP, Xerox, Samsung, Kyocera. Доставка по Екатеринбургу.",
	openGraph: {
		title: "Товары — Remito",
		description: "Картриджи и расходники для оргтехники в Екатеринбурге.",
		url: "https://remito.ru/tovary/",
	},
};

export default function Page() {
	return <ProductsPage />;
}
