import styles from './Burger.module.scss'

interface BurgerProps {
	isOpen: boolean
	onClick: () => void
}

export const Burger = ({ isOpen, onClick }: BurgerProps) => {
	return (
		<button
			className={`${styles.burger} ${isOpen ? styles.isOpen : ''}`}
			onClick={onClick}
			aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
			aria-expanded={isOpen}
		>
			<span />
			<span />
			<span />
		</button>
	)
}
