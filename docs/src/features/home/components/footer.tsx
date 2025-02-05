import { cls } from '@mink-ui/core/_shared/utils'

import styles from './footer.module.scss'

export interface HomeFooterProps {
  className?: string
}

export default function HomeFooter(props: HomeFooterProps) {
  const { className } = props

  return (
    <div className={cls(styles.home_footer, className)}>
      © clearink
    </div>
  )
}
