import { TermsPage } from '@/views/LegalDocumentPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Условия использования сайта — Remito',
	description: 'Правила использования сайта remito.рф',
	robots: { index: true, follow: true }
}

export default function Page() {
	return <TermsPage />
}
