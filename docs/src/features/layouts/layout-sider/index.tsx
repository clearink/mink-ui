import type { ForwardedRef } from 'react'

import { cls } from '@mink-ui/core/_shared/utils'
import { coalesce, isNullish } from '@mink-ui/shared'
import routes from '@routes'
import { forwardRef } from 'react'
import { NavLink } from 'react-router-dom'

import useSiderMenus from './hooks/use-sider-menus'
import styles from './style.module.scss'

export interface LayoutSiderProps {
  category?: string
  className?: string
}

function LayoutSider(props: LayoutSiderProps, ref: ForwardedRef<HTMLDivElement>) {
  const { className, category } = props

  const groups = useSiderMenus(routes, category)

  return (
    <div ref={ref} className={cls(styles.layout_sider, className)}>
      {groups.map(([group, menus], index) => (
        <section key={coalesce(group, `${index}`)} className={styles.menu_group}>
          {!isNullish(group) && <div className={styles.menu_title}>{group}</div>}
          {menus.map(item => (
            <NavLink end key={item.href} to={item.href} className={({ isActive }) => cls(styles.menu_item, isActive && styles.is_active)}>
              <span>{item.title}</span>
              {!isNullish(item.subtitle) && <span className={styles.item_subtitle}>{item.subtitle}</span>}
              {!isNullish(item.tags) && <span className={styles.item_tags}>{item.tags}</span>}
            </NavLink>
          ))}
        </section>
      ))}
    </div>
  )
}

export default forwardRef(LayoutSider)
