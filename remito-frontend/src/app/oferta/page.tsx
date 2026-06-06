import { OfertaPage } from '@/views/LegalDocumentPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Публичная оферта — Remito',
	description: 'Условия оказания услуг по ремонту и обслуживанию оргтехники в Екатеринбурге',
	robots: { index: true, follow: true }
}

export default function Page() {
	return <OfertaPage />
}
