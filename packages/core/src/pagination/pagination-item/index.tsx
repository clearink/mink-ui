import { usePrefixCls } from '@mink-ui/core/_shared/hooks'
import { betterDisplayName } from '@mink-ui/core/_shared/utils'
import { useMemo } from 'react'

import type { PaginationItemProps } from './props'

import useFormatClassNames from './hooks/use-format-class-names'

function PaginationItem(props: PaginationItemProps) {
  const { disabled, itemRender, page, showHtmlTitle } = props

  const prefixCls = usePrefixCls('pagination-item')

  const classNames = useFormatClassNames(prefixCls, props)

  const title = useMemo(() => (showHtmlTitle ? `${page}` : undefined), [page, showHtmlTitle])

  return (
    <li className={classNames.root} tabIndex={disabled ? -1 : 0} title={title}>
      {itemRender(page, 'page', <a rel="nofollow">{page}</a>)}
    </li>
  )
}

betterDisplayName(PaginationItem)

export default PaginationItem
