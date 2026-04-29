import { useMemo } from 'react'
import { cn } from '@mink-ui/core/_shared/libs/cn'

import marked from '@/libs/marked'

import styles from './style.module.scss'

export default function MarkdownBlock(props: MarkdownBlockProps) {
  const { rawText, className } = props

  const html = useMemo(() => marked.parse(rawText), [rawText])

  return (
    <div
      className={cn(styles.markdown_block, className)}
      dangerouslySetInnerHTML={{ __html: html }}
    >
    </div>
  )
}

export interface MarkdownBlockProps {
  rawText: string
  className?: string
}
