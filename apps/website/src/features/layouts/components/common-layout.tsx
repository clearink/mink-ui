import { useLocation, useOutlet } from 'react-router-dom'
import { SwitchTransition } from '@mink-ui/core/_shared/components/transition/src'
import { cn } from '@mink-ui/core/_shared/libs/cn'
import { Grid } from '@mink-ui/core/grid/src'

import { HomeFooter } from '@/features/home'
import LayoutSider from './layout-sider'

import styles from './common-layout.module.scss'

export default function CommonLayout() {
  const location = useLocation()
  const outlet = useOutlet()

  const levels = location.pathname.split('/').filter(Boolean)

  const category = levels[0]

  const motionId = location.pathname

  return (
    <Grid.Row className={styles.common_layout}>
      <Grid.Col
        className={cn(styles.sider, 'better-scroll')}
        lg={6}
        md={6}
        sm={24}
        xl={5}
        xs={24}
        xxl={4}
      >
        <LayoutSider className={styles.sider} category={category} />
      </Grid.Col>
      <Grid.Col
        className={cn(styles.content, 'better-scroll')}
        lg={18}
        md={18}
        sm={24}
        xl={19}
        xs={24}
        xxl={20}
      >
        <article className={styles.article}>
          <SwitchTransition classNames="x-slide-top" mode="out-in">
            <div
              key={motionId}
              className={styles.content}
            >
              {outlet}
            </div>
          </SwitchTransition>
        </article>
        <HomeFooter className={styles.footer} />
      </Grid.Col>
    </Grid.Row>
  )
}
