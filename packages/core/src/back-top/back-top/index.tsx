import type { BackTopProps } from './props'

import { usePrefixCls } from '../../_shared/hooks'
import { betterDisplayName } from '../../_shared/utils'
import useFormatClassNames from './hooks/use-format-class-names'

function BackTop(props: BackTopProps) {
  const prefixCls = usePrefixCls('back-top')

  const classNames = useFormatClassNames(prefixCls, props)

  return <div className={classNames.root}>back-top</div>
}

betterDisplayName(BackTop)

export default BackTop
