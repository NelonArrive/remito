import {
	SERVICES_DATA,
	getServiceBySlug,
} from "@/entities/service/model/service.data";
import { ServicePage } from "@/views/ServicePage";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
	params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
	return SERVICES_DATA.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;

	const service = getServiceBySlug(slug);

	if (!service) return {};

	return {
		title: `${service.title} в Екатеринбурге —  Remito`,
		description: service.description,
		openGraph: {
			title: `${service.title} —  Remito`,
			description: service.previewText,
			url: `https://remito.ru/uslugi/${service.slug}/`,
		},
	};
}

export default async function Page({ params }: Props) {
	const { slug } = await params;

	const service = getServiceBySlug(slug);

	if (!service) notFound();

	return <ServicePage service={service} />;
}
