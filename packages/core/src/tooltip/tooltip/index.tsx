import { Tooltip as InternalTooltip } from '@mink-ui/core/_shared/components'
import { usePrefixCls } from '@mink-ui/core/_shared/hooks'
import { betterDisplayName, cls } from '@mink-ui/core/_shared/utils'
import { fallback } from '@mink-ui/shared'

import type { TooltipProps } from './props'

function Tooltip(props: TooltipProps) {
  const { transition, classNames = {} } = props

  const rootPrefixCls = usePrefixCls()

  const prefixCls = `${rootPrefixCls}-tooltip`

  return (
    <InternalTooltip
      {...props}
      transition={fallback(transition, `${rootPrefixCls}-zoom-fast`)}
      classNames={{
        root: cls(prefixCls, classNames.root),
        arrow: cls(`${prefixCls}__arrow`, classNames.arrow),
        wrapper: cls(`${prefixCls}-wrapper`, classNames.wrapper),
      }}
    />
  )
}

betterDisplayName(Tooltip)

export default Tooltip
