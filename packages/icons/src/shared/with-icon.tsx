import type { FC } from 'react'
import type { IconMetaInfo, IconProps } from './_shared.props'
import type { IconWrapProps } from './with-icon.props'

import { fallback } from '@mink-ui/shared/function/fallback'

import { IconConfigContext } from './_shared.context'
import { cn } from './utils/cn'

function WithIcon(InternalIcon: FC<IconProps>, meta: IconMetaInfo) {
  const { name, theme } = meta

  const viewBox = theme === 'twotone' ? '64 64 896 896' : '0 0 1024 1024'

  return function IconWrap(props: IconWrapProps) {
    const iconConfig = IconConfigContext.use()

    const { ref, className, ...rest } = props

    return (
      <span
        {...rest}
        ref={ref}
        className={cn(iconConfig.prefixCls, `${iconConfig.prefixCls}-${name}`, className)}
        aria-label={name}
        role="img"
      >
        <InternalIcon
          aria-hidden="true"
          data-icon={name}
          fill="currentColor"
          focusable="false"
          viewBox={fallback(viewBox, iconConfig.viewBox)}
        />
      </span>
    )
  }
}

export default WithIcon
