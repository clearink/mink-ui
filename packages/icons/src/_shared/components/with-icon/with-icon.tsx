import type { IconComp, IconDesc } from '@mink-ui/icons/_shared/types'

import { type ForwardedRef, forwardRef } from 'react'

import type { IconWrapProps } from './with-icon.props'

export default function withIcon(Icon: IconComp, desc: IconDesc) {
  const { name, theme } = desc

  const viewBox = theme === 'twotone' ? '64 64 896 896' : '0 0 1024 1024'

  function IconWrap(props: IconWrapProps, ref: ForwardedRef<HTMLSpanElement>) {
    const { className, style } = props

    return (
      <span
        {...props}
        ref={ref}
        className={`mink-icon icon-${name}${className ? ` ${className}` : ''}`}
        style={style}
        aria-label={name}
        role="img"
      >
        <Icon
          aria-hidden="true"
          data-icon={name}
          fill="currentColor"
          focusable="false"
          height="1em"
          viewBox={viewBox}
          width="1em"
        />
      </span>
    )
  }

  return forwardRef(IconWrap)
}
