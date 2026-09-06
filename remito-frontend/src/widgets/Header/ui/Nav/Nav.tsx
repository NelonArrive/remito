'use client'

import { SERVICES_DATA } from '@/entities/service/model/service.data'
import { WEB_SERVICES } from '@/entities/web-service'
import { WEB_NAV, WEB_SERVICE_LINKS } from '@/widgets/Header/model/header-nav'
import {
	AppWindow,
	Building2,
	Droplets,
	Globe,
	HardDrive,
	Layout,
	Laptop,
	Monitor,
	Printer,
	ShoppingCart,
	Wind
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import { NavDropdown, type NavDropdownItem } from './NavDropdown'
import styles from './Nav.module.scss'

const REPAIR_ICON_MAP: Record<string, ReactNode> = {
	Printer: <Printer size={14} />,
	Droplets: <Droplets size={14} />,
	Laptop: <Laptop size={14} />,
	Monitor: <Monitor size={14} />,
	Wind: <Wind size={14} />,
	AppWindow: <AppWindow size={14} />,
	HardDrive: <HardDrive size={14} />
}

const WEB_ICON_MAP: Record<string, ReactNode> = {
	Layout: <Layout size={14} />,
	Globe: <Globe size={14} />,
	Building2: <Building2 size={14} />,
	ShoppingCart: <ShoppingCart size={14} />
}

interface NavProps {
	mode?: 'default' | 'web'
}

export const Nav = ({ mode = 'default' }: NavProps) => {
	const pathname = usePathname()
	const isWeb = mode === 'web'

	const repairItems: NavDropdownItem[] = SERVICES_DATA.map(service => ({
		href: `/uslugi/${service.slug}/`,
		label: service.shortTitle,
		icon: REPAIR_ICON_MAP[service.icon] ?? <Printer size={14} />
	}))

	const webItems: NavDropdownItem[] = WEB_SERVICE_LINKS.map((item, index) => ({
		href: item.href,
		label: item.label,
		meta: `от ${item.priceFrom.toLocaleString('ru')} ₽`,
		icon: WEB_ICON_MAP[WEB_SERVICES[index]?.icon ?? ''] ?? <Layout size={14} />
	}))

	const isRepairServicesActive = pathname?.startsWith('/uslugi')
	const isWebActive = pathname?.startsWith('/web')
	const isCenyActive = pathname === '/ceny' || pathname === '/ceny/'
	const isTovaryActive = pathname?.startsWith('/tovary')
	const isAboutActive = pathname?.startsWith('/o-kompanii')

	if (isWeb) {
		return (
			<nav className={styles.nav} aria-label='Навигация Remito Web'>
				<ul className={styles.list}>
					<NavDropdown
						id='web-services'
						label='Услуги'
						href={WEB_NAV.home}
						items={webItems}
						footer={{ href: WEB_NAV.pricing, label: 'Тарифы и цены' }}
						isActive={isWebActive && pathname !== '/web/ceny' && pathname !== '/web/ceny/'}
						accent='web'
					/>
					<li className={styles.item}>
						<Link
							href={WEB_NAV.pricing}
							className={`${styles.link} ${pathname?.includes('/web/ceny') ? styles.linkActive : ''}`}
						>
							Тарифы
						</Link>
					</li>
					<li className={styles.item}>
						<Link href='/' className={styles.link}>
							Ремонт техники
						</Link>
					</li>
				</ul>
			</nav>
		)
	}

	return (
		<nav className={styles.nav} aria-label='Основная навигация'>
			<ul className={styles.list}>
				<NavDropdown
					id='repair-services'
					label='Услуги'
					href='/uslugi/'
					items={repairItems}
					footer={{ href: '/uslugi/', label: 'Все услуги' }}
					isActive={isRepairServicesActive}
				/>
				<li className={styles.item}>
					<Link href='/tovary/' className={`${styles.link} ${isTovaryActive ? styles.linkActive : ''}`}>
						Товары
					</Link>
				</li>
				<li className={styles.item}>
					<Link href='/ceny/' className={`${styles.link} ${isCenyActive ? styles.linkActive : ''}`}>
						Цены
					</Link>
				</li>
				<li className={styles.item}>
					<Link href='/o-kompanii/' className={`${styles.link} ${isAboutActive ? styles.linkActive : ''}`}>
						О компании
					</Link>
				</li>
				<NavDropdown
					id='web'
					label='Web'
					href={WEB_NAV.home}
					items={webItems}
					footer={{ href: WEB_NAV.pricing, label: 'Цены на сайты' }}
					isActive={isWebActive}
					accent='web'
				/>
			</ul>
		</nav>
	)
}
