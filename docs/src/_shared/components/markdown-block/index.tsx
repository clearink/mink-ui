import marked from '@libs/marked'
import { cls } from '@mink-ui/core/_shared/utils'
import { useEffect, useState } from 'react'

import styles from './style.module.scss'

export interface MarkdownBlockProps {
  rawText: string
  className?: string
}

export default function MarkdownBlock(props: MarkdownBlockProps) {
  const { rawText, className } = props

  const [html, setHtml] = useState('')

  useEffect(() => {
    marked.parse(rawText, { async: true }).then(setHtml)
  }, [rawText])

  return (
    <div
      className={cls(styles.markdown_block, className)}
      dangerouslySetInnerHTML={{ __html: html }}
    >
    </div>
  )
}
