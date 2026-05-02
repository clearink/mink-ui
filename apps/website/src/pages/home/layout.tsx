import { useLocation, useOutlet } from 'react-router-dom'
import { SwitchTransition } from '@mink-ui/core/_shared/components/transition/src'
import { cn } from '@mink-ui/core/_shared/libs/cn'

import { HomeHeader } from '@/features/home'

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
      <SwitchTransition classNames="x-slide-top" current={{ key: motionId }} mode="out-in">
        {($motion, getters) => (
          <div
            ref={$motion}
            className={cn(styles.home_layout__main, getters.names())}
          >
            {outlet}
          </div>
        )}
      </SwitchTransition>
    </div>
  )
}
