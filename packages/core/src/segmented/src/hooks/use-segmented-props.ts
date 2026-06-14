import type { OmittedSegmentedProps, PickedSegmentedProps, SegmentedProps } from '../segmented.props'

import { useEffect, useState } from 'react'
import { fallback } from '@mink-ui/shared/function/fallback'
import { omit } from '@mink-ui/shared/object/omit'

import { useCommitState } from '../../../_shared/hooks/use-commit-state'
import { useConstant } from '../../../_shared/hooks/use-constant'
import { useControlledState } from '../../../_shared/hooks/use-controlled-state'
import { useCombinedSemantics } from '../../../_shared/hooks/use-settings/use-combined'
import { useConfiguration } from '../../../_shared/hooks/use-settings/use-configuration'
import { useWatchValue } from '../../../_shared/hooks/use-watch-value'
import { SizeContext } from '../../../config-provider/src/_shared.context'
import { defaultSegmentedProps as defaultProps } from '../segmented.props'
import { normalizeSegmentedOptions } from '../utils/format'
import { SegmentedControl } from '../utils/segmented-control'
import { useSegmentedClassNames } from './use-class-names'

export function useSegmentedProps(props: SegmentedProps) {
  const globalConfig = useConfiguration('segmented')
  const sizeContext = SizeContext.use()

  const {
    options: _options,
    value: _value,
    defaultValue: _default,
    onChange,
    block = defaultProps.block,
    size = fallback(globalConfig.size, sizeContext, defaultProps.size),
  } = props

  const omitted = props as OmittedSegmentedProps
  const picked: PickedSegmentedProps = { block, size }

  const ctrl = useConstant(() => new SegmentedControl())

  const options = normalizeSegmentedOptions(_options)

  const [value, handleChange] = useControlledState(
    _value,
    () => fallback(_default, options[0]?.value)!,
    onChange,
  )

  const { ns, classNames } = useSegmentedClassNames(picked, omitted)

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
    { meta: { ...omitted, ...picked, options, value } },
  )

  const [history, setHistory] = useCommitState (() => [null, value])

  const [isShowThumb, setIsShowThumb] = useState(false)

  const outerCssNames = { ...omit(cssNames, ['root', 'inner', 'item']), root: cssNames.item }
  const outerCssAttrs = { ...omit(cssAttrs, ['root', 'inner', 'item']), root: cssAttrs.item }

  const handleEnter = () => {
    const from = ctrl.items.get(history[0])

    if (!from || !ctrl.inner) return

    return ctrl.resolve(from)
  }

  const handleEntering = () => {
    const target = ctrl.items.get(history[1])

    if (!target || !ctrl.inner) return

    return ctrl.resolve(target)
  }

  const handleEntered = () => { setIsShowThumb(false) }

  const returnEarly = useWatchValue(value, () => {
    setHistory([history[1], value], () => { setIsShowThumb(true) })

    ctrl.update(value)
  })

  useEffect(() => () => { ctrl.destroy() }, [ctrl])

  return {
    omitted,
    ns,
    cssNames,
    cssAttrs,
    ctrl,
    options,
    value,
    isShowThumb,
    outerCssNames,
    outerCssAttrs,
    returnEmpty: returnEarly,
    handleChange,
    handleEnter,
    handleEntering,
    handleEntered,
  }
}
