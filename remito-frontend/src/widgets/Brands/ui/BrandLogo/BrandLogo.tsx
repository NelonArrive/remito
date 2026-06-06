import type { ComponentType } from 'react'
import type { BrandId } from '../../model/brands.data'
import {
	LogoAcer,
	LogoApple,
	LogoAsus,
	LogoBrother,
	LogoCanon,
	LogoDell,
	LogoEpson,
	LogoHp,
	LogoKonica,
	LogoKyocera,
	LogoLenovo,
	LogoLexmark,
	LogoMsi,
	LogoOki,
	LogoPantum,
	LogoRicoh,
	LogoSamsung,
	LogoXerox,
} from './brandLogos'

type BrandLogoProps = {
	brandId: BrandId
	className?: string
}

const LOGO_MAP: Record<BrandId, ComponentType<{ className?: string }>> = {
	canon: LogoCanon,
	hp: LogoHp,
	xerox: LogoXerox,
	samsung: LogoSamsung,
	epson: LogoEpson,
	brother: LogoBrother,
	kyocera: LogoKyocera,
	ricoh: LogoRicoh,
	pantum: LogoPantum,
	oki: LogoOki,
	lexmark: LogoLexmark,
	konica: LogoKonica,
	lenovo: LogoLenovo,
	apple: LogoApple,
	asus: LogoAsus,
	acer: LogoAcer,
	dell: LogoDell,
	msi: LogoMsi,
}

export function BrandLogo({ brandId, className }: BrandLogoProps) {
	const Logo = LOGO_MAP[brandId]
	return <Logo className={className} />
}
