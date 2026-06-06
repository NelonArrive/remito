import { PrivacyPolicyPage } from '@/views/LegalDocumentPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Политика конфиденциальности — Remito',
	description: 'Политика обработки персональных данных на сайте remito.рф',
	robots: { index: true, follow: true }
}

export default function Page() {
	return <PrivacyPolicyPage />
}
