import type { HTMLAttributes } from 'react'

import { cls } from '@mink-ui/core/_shared/utils'
import { Divider } from '@mink-ui/core/divider'
import { Tooltip } from '@mink-ui/core/tooltip'
import UpOutlined from '@mink-ui/icons/icons/UpOutlined'
import { omit } from '@mink-ui/shared'
import MarkedBlock from '@shared/components/markdown-block'
import { useState } from 'react'

import CodeCollapse from './code-collapse'
import styles from './style.module.scss'
import ToGithub from './to-github'

export interface CodeBlockProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  title: string
  rawText: string
  desc: Record<string, string>
  className?: string
}

const excluded = [
  'children',
  'title',
  'rawText',
  'desc',
  'className',
] as const

export default function CodeBlock(props: CodeBlockProps) {
  const { children, title, desc, rawText, className } = props

  const [isOpen, setIsOpen] = useState(false)

  const attrs = omit(props, excluded)

  return (
    <div {...attrs} className={cls(styles.code_block, className)}>
      <div className={styles.example_preview}>{children}</div>
      <Divider align="left" style={{ margin: 0 }}>
        <span className={styles.example_name}>
          <span>{title}</span>
          <ToGithub relativePath="aaa" />
        </span>
      </Divider>
      <MarkedBlock className={styles.example_desc} rawText={desc?.['zh-CN'] || ''} />
      <div className={styles.example_toolbar}>
        <Tooltip content={`${isOpen ? '收起' : '展开'}代码`}>
          <UpOutlined
            className={cls(styles.collapse_icon, !isOpen && styles['is-collapse'])}
            onClick={() => {
              setIsOpen(!isOpen)
            }}
          />
        </Tooltip>
      </div>
      <CodeCollapse isOpen={isOpen} rawText={rawText} />
    </div>
  )
}
