import { HomeHeader } from '@features/home'
import { SwitchTransition } from '@mink-ui/core/_shared/components'
import { useLocation, useOutlet } from 'react-router-dom'

import styles from './layout.module.scss'

export default function HomeLayout() {
  const location = useLocation()
  const outlet = useOutlet()

  const levels = location.pathname.split('/').filter(Boolean)

  const current = levels[0]

  // TODO: 能否在 routes.config 中指定？
  const motionId = ['blog', 'component', 'component-en'].includes(current)
    ? 'keep'
    : current

  return (
    <div className={styles.home_layout}>
      <HomeHeader />
      <SwitchTransition mode="out-in" classNames="page-transition-motion">
        <div key={motionId} className={styles.home_layout__main}>
          {outlet}
        </div>
      </SwitchTransition>
    </div>
  )
}
