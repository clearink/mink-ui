import type { OmittedInternalModalProps, PickedInternalModalProps } from '../modal.props'

import isEqual from 'react-fast-compare'

import { useComputed } from '../../../_shared/hooks/use-computed'
import { useNamespace } from '../../../_shared/hooks/use-settings/use-namespace'
import { cn } from '../../../_shared/libs/cn'
import { resolveModalWidthBreakpoints } from '../utils/helpers'

export function useModalClassNames(
  picked: PickedInternalModalProps,
  omitted: OmittedInternalModalProps,
) {
  const { centered } = picked
  const { _isJsxModal, prefixCls, width, type } = omitted

  const rns = useNamespace(preset => preset)
  const ns = useNamespace('modal', prefixCls)

  const cssVars = useComputed(
    () => resolveModalWidthBreakpoints(ns, width),
    [ns, width],
    isEqual,
  )

  return {
    rns,
    ns,
    cssVars,
    classNames: {
      root: cn(ns, {
        [`${ns}--centered`]: centered,
        [`${ns}--confirm`]: !_isJsxModal,
        [`${ns}--confirm-${type}`]: !_isJsxModal && type,
      }),
      mask: `${ns}-mask`,
      main: `${ns}__main`,
      header: `${ns}__header`,
      title: `${ns}__title`,
      statusIcon: `${ns}__status-icon`,
      closeBtn: `${ns}__close-btn`,
      body: `${ns}__body`,
      footer: `${ns}__footer`,
    },
  }
}
