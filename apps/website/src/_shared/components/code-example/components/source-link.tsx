import { Tooltip } from '@mink-ui/core/tooltip/src'
import EditOutlined from '@mink-ui/icons/EditOutlined'

import styles from './source-link.module.scss'

export default function SourceLink(props: SourceLinkProps) {
  const { relativePath } = props

  return (
    <Tooltip content="在 GitHub 上编辑此示例！">
      <a
        className={styles.source_link}
        href={`https://github.com/clearink/mink-ui/tree/master/${relativePath}`}
        target="_blank"
      >
        <EditOutlined />
      </a>
    </Tooltip>
  )
}

export interface SourceLinkProps {
  relativePath: string
}
