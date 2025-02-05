import { isUndefined } from '@mink-ui/shared'

import type { DividerProps } from '../props'

import { cls } from '../../../_shared/utils'

export default function useFormatClassNames(prefixCls: string, props: DividerProps) {
  const {
    align,
    children,
    dashed,
    direction,
    margin,
    plain,
    className,
    classNames = {},
  } = props

  return {
    root: cls(
      prefixCls,
      {
        [`${prefixCls}--${direction}`]: direction,
        [`${prefixCls}--align-${align}`]: align,
        [`${prefixCls}--custom-margin`]:
          (align === 'left' || align === 'right') && !isUndefined(margin),
        [`${prefixCls}--dashed`]: dashed,
        [`${prefixCls}--plain`]: plain,
        [`${prefixCls}--with-text`]: children,
      },
      className,
      classNames.root,
    ),
    text: cls(`${prefixCls}__inner-text`, classNames.text),
  }
}
