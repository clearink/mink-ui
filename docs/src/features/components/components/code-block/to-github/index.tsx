import { Tooltip } from '@mink-ui/core/tooltip'
import EditOutlined from '@mink-ui/icons/icons/EditOutlined'

import styles from './style.module.scss'

export interface LinkSourceFileProps {
  relativePath: string
}

export default function ToGithub(_props: LinkSourceFileProps) {
  // const { relativePath } = props

  return (
    <Tooltip content="在 GitHub 上编辑此示例！">
      {/* <a href={`${relativePath}`} target="_blank"><EditOutlined /></a> */}
      <EditOutlined className={styles.to_github} />
    </Tooltip>
  )
}
