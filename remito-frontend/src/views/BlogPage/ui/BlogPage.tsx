import { POSTS_MOCK } from '@/entities/post/model/post.mocks'
import type { PostPreview } from '@/entities/post/model/post.types'
import { ArrowRight, BookOpen, Calendar, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import s from './BlogPage.module.scss'

function formatDate(iso: string): string {
	return new Date(iso).toLocaleDateString('ru-RU', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	})
}

function PostCard({ post }: { post: PostPreview }) {
	return (
		<Link href={`/blog/${post.slug}/`} className={s.card}>
			<div className={s.cardImg}>
				{post.coverImage ? (
					<Image src={post.coverImage} alt={post.title} width={480} height={200} className={s.cardImgInner} />
				) : (
					<div className={s.cardImgPlaceholder}>
						<BookOpen size={32} />
					</div>
				)}
			</div>

			<div className={s.cardBody}>
				<div className={s.cardMeta}>
					<span className={s.cardDate}>
						<Calendar size={12} />
						{formatDate(post.publishedAt)}
					</span>
					<span className={s.cardDot} />
					<span className={s.cardAuthor}>
						<User size={12} />
						{post.authorName}
					</span>
				</div>

				<h2 className={s.cardTitle}>{post.title}</h2>
				<p className={s.cardPreview}>{post.previewText}</p>
			</div>

			<div className={s.cardFooter}>
				<span className={s.cardLink}>
					Читать статью
					<ArrowRight size={14} className={s.cardArrow} />
				</span>
			</div>
		</Link>
	)
}

export function BlogPage() {
	const posts = POSTS_MOCK.filter(p => p.isPublished)

	return (
		<main className={s.page}>
			{/* Hero */}
			<section className={s.hero}>
				<div className={s.heroBg} aria-hidden>
					<div className={s.heroBgGrid} />
					<div className={s.heroBgGlow} />
				</div>
				<div className={s.heroInner}>
					<span className={s.heroTag}>Блог</span>
					<h1 className={s.heroTitle}>
						Полезные <span>статьи</span>
					</h1>
					<p className={s.heroDesc}>
						Рассказываем о частых поломках, советах по уходу за техникой и ответах на популярные вопросы.
					</p>
				</div>
			</section>

			{/* Posts */}
			<section className={s.section}>
				<div className={s.container}>
					<div className={s.grid}>
						{posts.length === 0 ? (
							<div className={s.empty}>Статьи скоро появятся</div>
						) : (
							posts.map(post => <PostCard key={post.id} post={post} />)
						)}
					</div>
				</div>
			</section>
		</main>
	)
}
