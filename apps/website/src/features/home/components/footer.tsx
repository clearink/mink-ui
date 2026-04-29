import { cn } from '@mink-ui/core/_shared/libs/cn'

import styles from './footer.module.scss'

export interface HomeFooterProps {
  className?: string
}

export default function HomeFooter(props: HomeFooterProps) {
  const { className } = props

  return (
    <div className={cn(styles.home_footer, className)}>
      © clearink
    </div>
  )
}
