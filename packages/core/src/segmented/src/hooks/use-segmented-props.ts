import type { OmittedSegmentedProps, PickedSegmentedProps, SegmentedProps } from '../segmented.props'

import { useEffect } from 'react'
import { arrayEqual } from '@mink-ui/shared/array/array-equal'
import { getClientCoords } from '@mink-ui/shared/dom/rect'
import { fallback } from '@mink-ui/shared/function/fallback'
import { omit } from '@mink-ui/shared/object/omit'

import { useComputed } from '../../../_shared/hooks/use-computed'
import { useConstant } from '../../../_shared/hooks/use-constant'
import { useControlledState } from '../../../_shared/hooks/use-controlled-state'
import { useExactState } from '../../../_shared/hooks/use-exact-state'
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
    options,
    value,
    defaultValue,
    onChange,
    block = defaultProps.block,
    size = fallback(globalConfig.size, sizeContext, defaultProps.size),
  } = props

  const omitted = props as OmittedSegmentedProps
  const picked: PickedSegmentedProps = { block, size }

  const ctrl = useConstant(() => new SegmentedControl())

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
  )

  const normalizedOptions = useComputed(
    () => normalizeSegmentedOptions(options),
    options,
    arrayEqual,
  )

  const [currentValue, handleOnChange] = useControlledState({
    value,
    defaultValue: () => fallback(defaultValue, normalizedOptions[0]?.value)!,
    onChange,
  })

  const [history, setHistory] = useExactState([null, currentValue])

  const [isShowThumb, setIsShowThumb] = useExactState(false)

  const returnEarly = useWatchValue(currentValue, () => {
    setHistory([history[1], currentValue])

    setIsShowThumb(true)

    ctrl.update(currentValue)
  })

  const outerCssNames = { ...omit(cssNames, ['root', 'inner', 'item']), root: cssNames.item }
  const outerCssAttrs = { ...omit(cssAttrs, ['root', 'inner', 'item']), root: cssAttrs.item }

  const resolveTransform = (itemCoords: DOMRect) => {
    const innerCoords = getClientCoords(ctrl.inner)

    const delta = itemCoords.left - innerCoords.left

    return {
      transform: `translate3d(${delta}px, 0, 0)`,
      width: `${itemCoords.width}px`,
    }
  }

  const handleOnEnter = () => {
    const from = ctrl.items.get(history[0])

    if (!from || !ctrl.inner) return

    return resolveTransform(getClientCoords(from))
  }

  const handleOnEntering = () => {
    const target = ctrl.items.get(history[1])

    if (!target || !ctrl.inner) return

    return resolveTransform(getClientCoords(target))
  }

  const handleOnEntered = () => { setIsShowThumb(false) }

  useEffect(() => () => { ctrl.destroy() }, [ctrl])

  return {
    picked,
    omitted,
    ctrl,
    ns,
    cssNames,
    cssAttrs,
    outerCssNames,
    outerCssAttrs,
    normalizedOptions,
    currentValue,
    isShowThumb,
    returnEmpty: returnEarly,
    handleOnChange,
    handleOnEnter,
    handleOnEntering,
    handleOnEntered,
  }
}
