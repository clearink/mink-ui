import type { HTMLAttributes } from 'react'

import { useState } from 'react'
import { cn } from '@mink-ui/core/_shared/libs/cn'
import Divider from '@mink-ui/core/divider/src'
import { Tooltip } from '@mink-ui/core/tooltip/src'
import UpOutlined from '@mink-ui/icons/UpOutlined'

import MarkedBlock from '@/_shared/components/markdown-block'
import CodeCollapse from './components/code-collapse'
import SourceLink from './components/source-link'

import styles from './style.module.scss'

export default function CodeExample(props: CodeExampleProps) {
  const { className, element, title, metaInfo, rawText, cssName, relativePath } = props

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={cn(styles.code_example, className)}>
      <div className={cn(styles.example_preview, cssName)}>{element}</div>
      <Divider className={styles.example_name} align="left">
        <span>{title}</span>
        <SourceLink relativePath={relativePath} />
      </Divider>
      <MarkedBlock className={styles.example_desc} rawText={metaInfo?.['zh-CN'] || ''} />
      <div className={styles.example_toolbar}>
        <Tooltip content={`${isOpen ? '收起' : '展开'}代码`}>
          <UpOutlined
            className={cn(styles.collapse_icon, !isOpen && styles['is-collapse'])}
            onClick={() => setIsOpen(!isOpen)}
          />
        </Tooltip>
      </div>
      <CodeCollapse isOpen={isOpen} rawText={rawText} />
    </div>
  )
}

export interface CodeExampleProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  element: React.ReactNode
  cssName?: string
  title: string
  rawText: string
  metaInfo: Record<string, string>
  relativePath: string
}

const _excluded = [
  'element',
  'title',
  'rawText',
  'desc',
  'className',
] as const
