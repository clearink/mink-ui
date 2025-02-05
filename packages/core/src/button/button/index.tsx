import type { ForwardedRef, MouseEvent } from 'react'

import { semanticNames } from '@mink-ui/core/_shared/constants'
import { usePrefixCls, useSemanticStyles } from '@mink-ui/core/_shared/hooks'
import { betterDisplayName, withDefaults } from '@mink-ui/core/_shared/utils'
import { DisabledContext, SizeContext } from '@mink-ui/core/config-provider/_shared.context'
import TouchEffect from '@mink-ui/core/touch-effect'
import { omit } from '@mink-ui/shared'
import { forwardRef } from 'react'

import type { ButtonProps } from './props'

import { ButtonGroupContext } from '../_shared.context'
import { isBorderedVariant } from '../utils/helpers'
import useFormatClassNames from './hooks/use-format-class-names'
import { defaultButtonProps } from './props'

const excluded = [
  'theme',
  'variant',
  'shape',
  'size',
  'loading',
  'block',
  'ghost',
  'icon',
  'onClick',
  // 子元素
  'children',
  // 样式
  ...semanticNames,
] as const

function Button(_props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) {
  const buttonGroupCtx = ButtonGroupContext.useState()

  const props = withDefaults(
    {
      ..._props,
      disabled: _props.disabled || buttonGroupCtx.disabled,
    },
    {
      ...defaultButtonProps,
      disabled: DisabledContext.useState(),
      size: SizeContext.useState(),
    },
  )

  const { children, disabled, loading, onClick, variant } = props

  const styles = useSemanticStyles(props)

  const prefixCls = usePrefixCls('button')

  const classNames = useFormatClassNames(prefixCls, props)

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) e.preventDefault()
    else onClick?.(e)
  }

  const attrs = omit(props, excluded)

  const contentNode = (
    <button
      {...attrs}
      ref={ref}
      className={classNames.root}
      style={styles.root}
      onClick={handleClick}
    >
      <span className={classNames.text} style={styles.text}>
        {children}
      </span>
    </button>
  )

  if (!isBorderedVariant(variant)) return contentNode

  return (
    <TouchEffect component="Button" disabled={!!loading}>
      {contentNode}
    </TouchEffect>
  )
}

betterDisplayName(Button)

export default forwardRef(Button)
