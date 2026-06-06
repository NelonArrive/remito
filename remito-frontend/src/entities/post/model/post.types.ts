export interface Post {
	id: number
	title: string
	slug: string
	content: string
	previewText: string
	coverImage: string
	authorName: string
	isPublished: boolean
	publishedAt: string
	createdAt: string
}

export type PostPreview = Omit<Post, 'content'>
