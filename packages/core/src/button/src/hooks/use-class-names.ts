import type { OmittedButtonProps, PickedButtonProps } from '../button.props'

import { useNamespace } from '../../../_shared/hooks/use-settings/use-namespace'
import { cn } from '../../../_shared/libs/cn'
import { isRenderable } from '../../../_shared/utils/renderable'
import { defaultButtonProps as defaultProps } from '../button.props'

/**
 * @description 获取按钮的 className
 */
export function useButtonClassNames(
  picked: PickedButtonProps,
  omitted: OmittedButtonProps,
  others: { isLoading: boolean },
) {
  const { shape, size, theme, variant, disabled, iconPlacement } = picked
  const { block, ghost, prefixCls, icon, children } = omitted
  const { isLoading } = others

  const rns = useNamespace(preset => preset)

  const ns = useNamespace('button', prefixCls)

  return {
    rns,
    ns,
    classNames: {
      root: cn(ns, {
        [`${ns}--block`]: block,
        [`${ns}--disabled`]: disabled,
        [`${ns}--ghost`]: ghost,
        [`${ns}--loading`]: isLoading,
        [`${ns}--shape-${shape}`]: shape && shape !== defaultProps.shape,
        [`${ns}--size-${size}`]: size && size !== defaultProps.size,
        [`${ns}--theme-${theme}`]: theme && theme !== defaultProps.theme,
        [`${ns}--variant-${variant}`]: variant && variant !== defaultProps.variant,
        [`${ns}--icon-end`]: iconPlacement === 'end',
        [`${ns}--icon-only`]: !isRenderable(children) && (isRenderable(icon) || isLoading),
      }),
      icon: `${ns}__icon`,
      text: `${ns}__text`,
    },
  }
}
