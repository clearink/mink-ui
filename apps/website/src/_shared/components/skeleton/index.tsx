import { useEffect, useState } from 'react'
import { makeTimeout } from '@mink-ui/shared/dom/timer'

import styles from './style.module.scss'

const defaultProps: Partial<SkeletonProps> = {
  delay: 200,
}

export default function Skeleton(props: SkeletonProps) {
  const {
    delay = defaultProps.delay,
  } = props

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

export interface SkeletonProps {
  delay?: number
}
