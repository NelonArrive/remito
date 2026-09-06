import type { Post } from '@/entities/post/model/post.types'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import s from './BlogPostPage.module.scss'

interface BlogPostPageProps {
	post: Post
}

function formatDate(iso: string): string {
	return new Date(iso).toLocaleDateString('ru-RU', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	})
}

export function BlogPostPage({ post }: BlogPostPageProps) {
	return (
		<main className={s.page}>
			{/* Hero */}
			<section className={s.hero}>
				<div className={s.heroBg} aria-hidden>
					<div className={s.heroBgGrid} />
					<div className={s.heroBgGlow} />
				</div>

				<div className={s.heroInner}>
					<nav className={s.breadcrumbs} aria-label='Хлебные крошки'>
						<Link href='/' className={s.breadcrumbLink}>
							Главная
						</Link>
						<span className={s.breadcrumbSep}>/</span>
						<Link href='/blog/' className={s.breadcrumbLink}>
							Блог
						</Link>
						<span className={s.breadcrumbSep}>/</span>
						<span className={s.breadcrumbCurrent}>{post.title}</span>
					</nav>

					<div className={s.heroMeta}>
						<span className={s.heroMetaItem}>
							<Calendar size={13} />
							{formatDate(post.publishedAt)}
						</span>
						<span className={s.heroMetaDot} />
						<span className={s.heroMetaItem}>
							<User size={13} />
							{post.authorName}
						</span>
					</div>

					<h1 className={s.heroTitle}>{post.title}</h1>
				</div>

				{post.coverImage && (
					<div className={s.cover}>
						<Image src={post.coverImage} alt={post.title} width={800} height={360} className={s.coverImg} priority />
					</div>
				)}
			</section>

			{/* Body */}
			<section className={s.body}>
				<div className={s.container}>
					<Link href='/blog/' className={s.back}>
						<ArrowLeft size={16} />
						Все статьи
					</Link>

					{/* HTML content из бэка */}
					<article className={s.content} dangerouslySetInnerHTML={{ __html: post.content }} />
				</div>
			</section>
		</main>
	)
}
