import type { Orientation } from '../../../_shared/types/orientation'
import type { OmittedDividerProps, PickedDividerProps } from '../divider.props'

import { useNamespace } from '../../../_shared/hooks/use-settings/use-namespace'
import { cn } from '../../../_shared/libs/cn'
import { isRenderable } from '../../../_shared/utils/renderable'

export function useDividerClassNames(
  picked: PickedDividerProps,
  omitted: OmittedDividerProps,
  others: { orientation: Orientation },
) {
  const { align, variant, size } = picked
  const { children, plain, prefixCls } = omitted
  const { orientation } = others

  const ns = useNamespace('divider', prefixCls)

  return {
    classNames: {
      root: cn(ns, {
        [`${ns}--with-text`]: isRenderable(children) && orientation === 'horizontal',
        [`${ns}--align-${align}`]: align,
        [`${ns}--variant-${variant}`]: variant,
        [`${ns}--${orientation}`]: orientation,
        [`${ns}--plain`]: plain,
        [`${ns}--size-${size}`]: size,
      }),
      content: `${ns}__content`,
    },
  }
}
