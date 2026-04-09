import s from './Brands.module.scss'
import { BRANDS_ROW_1, BRANDS_ROW_2 } from '../model/brands.data'
import type { Brand } from '../model/brands.data'

function renderItems(brands: Brand[]) {
  return [...brands, ...brands].map((brand, i) => (
    <div key={`${brand.id}-${i}`} className={s.item} aria-hidden={i >= brands.length}>
      <span className={s.itemEmoji}>{brand.emoji}</span>
      <span className={s.itemName}>{brand.name}</span>
    </div>
  ))
}

export function Brands() {
  return (
    <section className={s.section}>
      <div className={s.container}>
        <div className={s.header}>
          <h2 className={s.title}>
            <span>Работаем</span> с брендами
          </h2>
        </div>
      </div>

      <div className={s.track}>
        <div className={`${s.row} ${s.rowForward}`}>
          {renderItems(BRANDS_ROW_1)}
        </div>
        <div className={`${s.row} ${s.rowBackward}`}>
          {renderItems(BRANDS_ROW_2)}
        </div>
      </div>
    </section>
  )
}