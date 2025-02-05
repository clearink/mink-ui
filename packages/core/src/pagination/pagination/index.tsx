import { usePrefixCls } from '@mink-ui/core/_shared/hooks'
import { betterDisplayName, withDefaults } from '@mink-ui/core/_shared/utils'

import type { PaginationProps } from './props'

import useFormatClassNames from './hooks/use-format-class-names'
import usePaginationChunks from './hooks/use-pagination-chunks'
import { defaultPaginationProps } from './props'

function Pagination(_props: PaginationProps) {
  const props = withDefaults(_props, defaultPaginationProps)

  const { onChange } = props

  const prefixCls = usePrefixCls('pagination')

  const classNames = useFormatClassNames(prefixCls, props)

  const [_current, chunkCount] = usePaginationChunks(props)

  // 渲染 prev list next size jumper
  return (
    <div className={classNames.root}>
      {Array.from({ length: chunkCount }, (_, i) => {
        return (
          <div
            key={i}
            className={`${prefixCls}__item`}
            onClick={() => {
              onChange && onChange(i + 1, 10)
            }}
          >
            <a className={`${prefixCls}__text`} rel="nofollow">
              {['你好', 'hello world'][i % 2]}
            </a>

          </div>
        )
      })}
    </div>
  )
}

betterDisplayName(Pagination)

export default Pagination
