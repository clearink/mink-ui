import { withDefaults } from '@mink-ui/core/_shared/utils'
import { makeTimeout } from '@mink-ui/shared'
import { useEffect, useState } from 'react'

import styles from './style.module.scss'

export interface SkeletonProps {
  delay?: number
}

const defaultProps: Partial<SkeletonProps> = {
  delay: 200,
}

export default function Skeleton(_props: SkeletonProps) {
  const props = withDefaults(_props, defaultProps)

  const { delay } = props

  const [isShow, setIsShow] = useState(delay! <= 0)

  useEffect(() => makeTimeout(delay!, () => { setIsShow(true) }), [delay])

  if (!isShow) return null

  return (
    <div className={styles.skeleton}>
      <div className={styles.skeleton_item}></div>
      <div className={styles.skeleton_item}></div>
      <div className={styles.skeleton_item}></div>
      <div className={styles.skeleton_item}></div>
    </div>
  )
}
