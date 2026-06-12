import type { AlertProps, OmittedAlertProps, PickedAlertProps } from '../alert.props'

import { useImperativeHandle, useRef, useState } from 'react'
import { fallback } from '@mink-ui/shared/function/fallback'
import { omit } from '@mink-ui/shared/object/omit'

import { useCombinedSemantics } from '../../../_shared/hooks/use-settings/use-combined'
import { useConfiguration } from '../../../_shared/hooks/use-settings/use-configuration'
import { normalizeClosable } from '../../../_shared/utils/closable'
import { excludedAlertProps } from '../alert.props'
import { useAlertClassNames } from './use-class-names'

export function useAlertProps(props: AlertProps) {
  const globalConfig = useConfiguration('alert')

  const {
    ref,
    closable,
    onClose,
    onClosed,
    type = fallback(props.type, props.banner ? 'warning' : 'info'),
    showIcon = fallback(props.showIcon, !!props.banner),
  } = props

  const omitted = props as OmittedAlertProps
  const picked: PickedAlertProps = { type, showIcon }

  const $element = useRef<HTMLDivElement>(null)

  const [visible, setVisible] = useState(true)

  const { ns, classNames } = useAlertClassNames(picked, omitted)

  const [cssNames, cssAttrs] = useCombinedSemantics(
    [
      globalConfig.classNames,
      { root: globalConfig.className },
      classNames,
      omitted.classNames,
      { root: omitted.className },
    ],
    [
      globalConfig.styles,
      { root: globalConfig.style },
      omitted.styles,
      { root: omitted.style },
    ],
    { meta: { ...omitted, ...picked } },
  )

  const [closableState, closeIconRender] = normalizeClosable({
    currentState: { closable },
    contextState: { closable: globalConfig.closable },
  })

  const restAttrs = omit(props, excludedAlertProps)

  const handleClose = () => {
    setVisible(false)

    onClose?.()

    closableState?.onClose?.()
  }

  const handleClosed = () => {
    onClosed?.()

    closableState?.onClosed?.()
  }

  useImperativeHandle(ref, () => ({ nativeElement: $element.current }))

  return {
    picked,
    omitted,
    $element,
    ns,
    cssNames,
    cssAttrs,
    visible,
    closeIconRender,
    restAttrs,
    handleClose,
    handleClosed,
  }
}
