import { cls } from '@mink-ui/core/_shared/utils'

import type { FormContextState } from '../../_shared.context'
import type { FormItemLabelProps } from '../props'

export default function useFormatClassNames(
  prefixCls: string,
  props: FormItemLabelProps,
  ctx: FormContextState,
) {
  const {
    colon,
    labelAlign,
    labelWrap,
    required,
    requiredMark,
    labelCol = {},
  } = props

  return {
    root: cls(
      prefixCls,
      {
        [`${prefixCls}--align-${labelAlign}`]: labelAlign,
        [`${prefixCls}--colon`]: colon,
        [`${prefixCls}--has-colon`]: colon && ctx.layout !== 'vertical',
        [`${prefixCls}--required`]: required,
        [`${prefixCls}--required-optional`]: requiredMark === 'optional',
        [`${prefixCls}--wrap`]: labelWrap,
      },
      labelCol.className,
    ),
  }
}
