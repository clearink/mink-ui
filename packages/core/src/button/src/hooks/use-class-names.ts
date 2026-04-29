import type { OmittedButtonProps, PickedButtonProps } from '../button.props'

import { useNamespace } from '../../../_shared/hooks/use-settings/use-namespace'
import { cn } from '../../../_shared/libs/cn'
import { defaultButtonProps as defaultProps } from '../button.props'

/**
 * @description 获取按钮的 className
 */
export function useButtonClassNames(picked: PickedButtonProps, omitted: OmittedButtonProps) {
  const { shape, size, theme, variant, disabled } = picked
  const { block, ghost, loading, prefixCls } = omitted

  const ns = useNamespace('button', prefixCls)

  return {
    root: cn(ns, {
      [`${ns}--block`]: block,
      [`${ns}--disabled`]: disabled,
      [`${ns}--ghost`]: ghost,
      [`${ns}--loading`]: loading,
      [`${ns}--shape-${shape}`]: shape && shape !== defaultProps.shape,
      [`${ns}--size-${size}`]: size && size !== defaultProps.size,
      [`${ns}--theme-${theme}`]: theme && theme !== defaultProps.theme,
      [`${ns}--variant-${variant}`]: variant && variant !== defaultProps.variant,
    }),
    icon: `${ns}_icon`,
    text: `${ns}_text`,
  }
}
