import type { AlertProps, OmittedAlertProps, PickedAlertProps } from '../alert.props'

import { useImperativeHandle, useRef } from 'react'
import { fallback } from '@mink-ui/shared/function/fallback'
import { omit } from '@mink-ui/shared/object/omit'

import { useExactState } from '../../../_shared/hooks/use-exact-state'
import { useCombinedSemantics } from '../../../_shared/hooks/use-settings/use-combined'
import { useConfiguration } from '../../../_shared/hooks/use-settings/use-configuration'
import { excludedAlertProps } from '../alert.props'
import { useAlertClassNames } from './use-class-names'

export function useAlertProps(props: AlertProps) {
  const globalConfig = useConfiguration('alert')

  const {
    ref,
    type = fallback(props.type, props.banner ? 'warning' : 'info'),
    showIcon = fallback(props.showIcon, !!props.banner),
    onClose,
  } = props

  const omitted = props as OmittedAlertProps
  const picked: PickedAlertProps = { type, showIcon }

  const $element = useRef<HTMLDivElement>(null)

  const [visible, setVisible] = useExactState(true)

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
  )

  const attrs = omit(props, excludedAlertProps)

  const handleOnClose = () => {
    onClose?.()
    setVisible(false)
  }

  useImperativeHandle(ref, () => ({ nativeElement: $element.current }))

  return {
    picked,
    omitted,
    ns,
    cssNames,
    cssAttrs,
    globalConfig,
    visible,
    attrs,
    handleOnClose,
  }
}
