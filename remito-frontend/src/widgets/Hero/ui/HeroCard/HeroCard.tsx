import styles from './HeroCard.module.scss';

interface FloatBadge {
  icon: string;        // emoji
  iconBg: string;      // цвет фона иконки
  title: string;
  sub: string;
}

interface CardItem {
  text: string;
}

interface HeroCardProps {
  floatTL: FloatBadge;
  floatBR: FloatBadge;
  icon: React.ReactNode;
  title: string;
  items: CardItem[];
  priceLabel: string;
  priceVal: string;
}

export const HeroCard = ({
  floatTL,
  floatBR,
  icon,
  title,
  items,
  priceLabel,
  priceVal,
}: HeroCardProps) => {
  return (
    <div className={styles.card}>

      {/* Float — top left */}
      <div className={`${styles.float} ${styles.floatTL}`}>
        <div className={styles.floatIcon} style={{ background: floatTL.iconBg }}>
          {floatTL.icon}
        </div>
        <div className={styles.floatText}>
          <span className={styles.floatTitle}>{floatTL.title}</span>
          <span className={styles.floatSub}>{floatTL.sub}</span>
        </div>
      </div>

      {/* Icon */}
      <div className={styles.cardIcon}>{icon}</div>

      {/* Title */}
      <div className={styles.cardTitle}>{title}</div>

      {/* List */}
      <div className={styles.cardList}>
        {items.map((item, i) => (
          <div key={i} className={styles.cardItem}>
            <span className={styles.cardItemDot} />
            {item.text}
          </div>
        ))}
      </div>

      {/* Price */}
      <div className={styles.cardPrice}>
        <span className={styles.cardPriceLabel}>{priceLabel}</span>
        <span className={styles.cardPriceVal}>{priceVal}</span>
      </div>

      {/* Float — bottom right */}
      <div className={`${styles.float} ${styles.floatBR}`}>
        <div className={styles.floatIcon} style={{ background: floatBR.iconBg }}>
          {floatBR.icon}
        </div>
        <div className={styles.floatText}>
          <span className={styles.floatTitle}>{floatBR.title}</span>
          <span className={styles.floatSub}>{floatBR.sub}</span>
        </div>
      </div>

    </div>
  );
};