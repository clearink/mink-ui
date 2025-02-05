import { NavLink, useNavigate } from 'react-router-dom'

import styles from './header.module.scss'

export default function HomeHeader() {
  const navigate = useNavigate()

  return (
    <div className={styles.home_header}>
      <div className={styles.content}>
        <div className={styles.left}>
          <span className={styles.slogan} onClick={() => { navigate('/') }}>
            mink-ui
          </span>
        </div>
        <div className={styles.right}>
          <NavLink className={styles['link-item']} to="/blog">博客</NavLink>
          <NavLink className={styles['link-item']} to="/component">组件</NavLink>
        </div>
      </div>
    </div>
  )
}
