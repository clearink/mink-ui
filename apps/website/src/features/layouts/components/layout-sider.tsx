import { NavLink } from 'react-router-dom'
import { SwitchTransition } from '@mink-ui/core/_shared/components/transition/src'
import { cn } from '@mink-ui/core/_shared/libs/cn'
import { isNullish } from '@mink-ui/shared/is/is-nullish'

import routes from '@/routes'
import useSiderMenus from '../hooks/use-sider-menus'

import styles from './layout-sider.module.scss'

function LayoutSider(props: LayoutSiderProps) {
  const { className, category } = props

  const groups = useSiderMenus(routes, category)

  return (
    <SwitchTransition classNames="x-slide-left" mode="out-in">
      <div key={category} className={cn(styles.layout_sider, className, 'better-scroll')}>
        {groups.map(([group, menus], index) => (
          <section key={group ?? `${index}`} className={styles.menu_group}>
            {!isNullish(group) && <div className={styles.menu_title}>{group}</div>}
            {menus.map(item => (
              <NavLink key={item.href} className={({ isActive }) => cn(styles.menu_item, isActive && styles.is_active)} end to={item.href}>
                <span>{item.title}</span>
                {!isNullish(item.subtitle) && <span className={styles.item_subtitle}>{item.subtitle}</span>}
                {!isNullish(item.tags) && <span className={styles.item_tags}>{item.tags}</span>}
              </NavLink>
            ))}
          </section>
        ))}
      </div>
    </SwitchTransition>
  )
}

export default LayoutSider

export interface LayoutSiderProps {
  className?: string

  category?: string
}
