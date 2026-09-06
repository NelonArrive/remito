import { POSTS_MOCK } from "@/entities/post/model/post.mocks";
import { BlogPostPage } from "@/views/BlogPostPage";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
	params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
	return POSTS_MOCK.filter((p) => p.isPublished).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;

	const post = POSTS_MOCK.find((p) => p.slug === slug);

	if (!post) return {};

	return {
		title: `${post.title} — Блог Remito`,
		description: post.previewText,
		openGraph: {
			title: post.title,
			description: post.previewText,
			url: `https://remito.ru/blog/${post.slug}/`,
			images: post.coverImage ? [{ url: post.coverImage }] : [],
		},
	};
}

export default async function Page({ params }: Props) {
	const { slug } = await params;

	const post = POSTS_MOCK.find((p) => p.slug === slug && p.isPublished);

	if (!post) notFound();

	return <BlogPostPage post={post} />;
}
