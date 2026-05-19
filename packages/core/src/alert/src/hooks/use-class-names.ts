import type { OmittedAlertProps, PickedAlertProps } from '../alert.props'

import { useNamespace } from '../../../_shared/hooks/use-settings/use-namespace'
import { cn } from '../../../_shared/libs/cn'
import { isRenderable } from '../../../_shared/utils/renderable'

export function useAlertClassNames(picked: PickedAlertProps, omitted: OmittedAlertProps) {
  const { type } = picked
  const { banner, description, prefixCls } = omitted

  const ns = useNamespace('alert', prefixCls)

  return {
    ns,
    classNames: {
      root: cn(ns, {
        [`${ns}--as-banner`]: banner,
        [`${ns}--${type}`]: type,
        [`${ns}--has-description`]: isRenderable(description),
      }),
      statusIcon: `${ns}__status-icon`,
      closeBtn: `${ns}__close-btn`,
      content: `${ns}__content`,
      message: `${ns}__message`,
      description: `${ns}__description`,
      action: `${ns}__action`,
    },
  }
}
