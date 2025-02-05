import { HomeFooter } from '@features/home'
import { SwitchTransition } from '@mink-ui/core/_shared/components'
import { cls } from '@mink-ui/core/_shared/utils'
import { Grid } from '@mink-ui/core/grid'
import { useLocation, useOutlet } from 'react-router-dom'

import LayoutSider from '../layout-sider'
import styles from './style.module.scss'

export default function CommonLayout() {
  const location = useLocation()
  const outlet = useOutlet()

  const levels = location.pathname.split('/').filter(Boolean)

  const category = levels[0]

  const motionId = location.pathname

  return (
    <Grid.Row className={styles.common_layout}>
      <Grid.Col
        xs={24}
        sm={24}
        md={6}
        lg={6}
        xl={5}
        xxl={4}
        className={cls(styles.sider, 'better-scroll')}
      >
        <SwitchTransition mode="out-in" classNames="sider-menu-motion">
          <LayoutSider key={category} category={category} />
        </SwitchTransition>
      </Grid.Col>
      <Grid.Col
        xs={24}
        sm={24}
        md={18}
        lg={18}
        xl={19}
        xxl={20}
        className={cls(styles.content, 'better-scroll')}
      >
        <article className={styles.article}>
          <SwitchTransition mode="out-in" classNames="page-transition-motion">
            <div key={motionId}>
              {outlet}
            </div>
          </SwitchTransition>
        </article>
        <HomeFooter className={styles.footer} />
      </Grid.Col>
    </Grid.Row>
  )
}
