import type { CSSProperties } from 'react'

import { cn } from '@mink-ui/core/_shared/libs/cn'

import styles from './style.module.scss'

interface PropColumn {
  'name': string
  'type'?: string | string[]
  'enum'?: boolean
  'defaultValue'?: string
  'version'?: string
  'zh-CN'?: string
  'en-US'?: string
  'style'?: CSSProperties
  'className'?: string
}

export interface PropsTableProps {
  columns: PropColumn[]
}

export default function PropsTable(props: PropsTableProps) {
  const { columns } = props

  return (
    <div className={cn(styles.props_table, 'better-scroll')}>
      <table>
        <thead>
          <tr>
            <th>属性</th>
            <th>说明</th>
            <th>类型</th>
            <th>默认值</th>
            <th>版本</th>
          </tr>
        </thead>
        <tbody>
          {columns.map(column => (
            <tr key={column.name}>
              <td className={styles.prop_name}>{column.name}</td>
              <td>{column['zh-CN'] || '-'}</td>
              <td className={styles.prop_type}>{formatType(column)}</td>
              <td className={styles.prop_default}>{column.defaultValue || '-'}</td>
              <td>{column.version || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function formatType(column: PropColumn) {
  if (column.enum && Array.isArray(column.type)) {
    return column.type.join(' | ')
  }

  return column.type || '-'
}
