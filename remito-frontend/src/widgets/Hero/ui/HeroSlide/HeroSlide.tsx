import { Button } from '@/shared/ui/Button';
import { HeroCard } from '../HeroCard/HeroCard';
import styles from './HeroSlide.module.scss';

interface Stat {
  num: string;
  label: string;
}

export interface HeroSlideData {
  id: string;
  theme: 'slide1' | 'slide2' | 'slide3';   // для --modifier на корневом элементе
  badge: string;
  title: React.ReactNode;                    // допускаем <br/> и <em>
  desc: string;
  btnPrimary: {
    label: string;
    icon: React.ReactNode;
    onClick?: () => void;
    href?: string;                           // слайд 3 ведёт на /web#zayavka
  };
  btnOutline: {
    label: string;
    href: string;
  };
  stats: Stat[];
  card: React.ComponentProps<typeof HeroCard>;
}

interface HeroSlideProps {
  data: HeroSlideData;
}

export const HeroSlide = ({ data }: HeroSlideProps) => {
  const { theme, badge, title, desc, btnPrimary, btnOutline, stats, card } = data;

  return (
    <div className={`swiper-slide ${styles.slide} ${styles[theme]}`}>

      {/* BG decorations */}
      <div className={styles.bg}>
        <div className={styles.dotsGrid} />
        <div className={styles.circle} />
        <div className={styles.circle} />
      </div>

      <div className={styles.container}>

        {/* LEFT — content */}
        <div className={styles.content}>

          <span className={styles.badge}>
            <span className={styles.badgeDot} />
            {badge}
          </span>

          <h1 className={styles.title}>{title}</h1>

          <p className={styles.desc}>{desc}</p>

          <div className={styles.btns}>
            <Button
              variant="cta"
              icon={btnPrimary.icon}
              onClick={btnPrimary.onClick}
            >
              {btnPrimary.label}
            </Button>

            <a href={btnOutline.href} className={styles.btnOutline}>
              {btnOutline.label}
            </a>
          </div>

          <div className={styles.stats}>
            {stats.map((stat, i) => (
              <div key={i} className={styles.stat}>
                <span className={styles.statNum}>{stat.num}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>

        </div>

        {/* RIGHT — card */}
        <div className={styles.visual}>
          <HeroCard {...card} />
        </div>

      </div>
    </div>
  );
};