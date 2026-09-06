import { BlogPage } from "@/views/BlogPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Блог —  Remito | Советы по ремонту оргтехники",
	description:
		"Полезные статьи о ремонте принтеров, МФУ и ноутбуков. Советы по уходу за техникой, разбор частых поломок и ответы на популярные вопросы.",
	openGraph: {
		title: "Блог —  Remito",
		description: "Статьи о ремонте оргтехники в Екатеринбурге.",
		url: "https://remito.ru/blog/",
	},
};

export default function Page() {
	return <BlogPage />;
}
