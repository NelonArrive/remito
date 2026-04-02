import styles from './HeroControls.module.scss'

interface HeroControlsProps {
	onPrev: () => void
	onNext: () => void
	progressRef: React.RefObject<HTMLDivElement>
}

export function HeroControls({ onPrev, onNext, progressRef }: HeroControlsProps) {
	return (
		<div className={styles.controls}>
			<div className={styles.progress}>
				<div className={styles.progressBar} ref={progressRef} />
			</div>

			<div className={styles.nav}>
				<button className={styles.navBtn} onClick={onPrev} aria-label='Предыдущий слайд'>
					<svg
						width='16'
						height='16'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2.5'
						strokeLinecap='round'
						strokeLinejoin='round'
					>
						<polyline points='15 18 9 12 15 6' />
					</svg>
				</button>
				<button className={styles.navBtn} onClick={onNext} aria-label='Следующий слайд'>
					<svg
						width='16'
						height='16'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2.5'
						strokeLinecap='round'
						strokeLinejoin='round'
					>
						<polyline points='9 18 15 12 9 6' />
					</svg>
				</button>
			</div>
		</div>
	)
}
