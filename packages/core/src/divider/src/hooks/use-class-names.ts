import type { Orientation } from '../../../_shared/types'
import type { OmittedDividerProps, PickedDividerProps } from '../divider.props'

import { isNullish } from '@mink-ui/shared/is/is-nullish'

import { useNamespace } from '../../../_shared/hooks/use-settings/use-namespace'
import { cn } from '../../../_shared/libs/cn'

export function useDividerClassNames(
  picked: PickedDividerProps,
  omitted: OmittedDividerProps,
  orientation: Orientation,
) {
  const { align, variant, size } = picked
  const { children, plain, prefixCls } = omitted

  const ns = useNamespace('divider', prefixCls)

  return {
    root: cn(ns, {
      [`${ns}--with-text`]: !isNullish(children),
      [`${ns}--align-${align}`]: align,
      [`${ns}--variant-${variant}`]: variant,
      [`${ns}--${orientation}`]: orientation,
      [`${ns}--plain`]: plain,
      [`${ns}--size-${size}`]: size,
    }),
    content: `${ns}__content`,
  }
}
