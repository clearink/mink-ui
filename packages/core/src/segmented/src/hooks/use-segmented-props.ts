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
import { SegmentedRefs } from '../utils/segmented-refs'
import { useSegmentedClassNames } from './use-class-names'

export function useSegmentedProps(props: SegmentedProps) {
  const globalConfig = useConfiguration('segmented')
  const sizeContext = SizeContext.use()

  const {
    options: _options,
    value,
    defaultValue,
    onChange,
    block = defaultProps.block,
    size = fallback(globalConfig.size, sizeContext, defaultProps.size),
  } = props

  const omitted = props as OmittedSegmentedProps
  const picked: PickedSegmentedProps = { block, size }

  const refs = useConstant(() => new SegmentedRefs())

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

  const normalizedOptions = useComputed({
    deps: _options,
    compare: arrayEqual,
    factory: () => normalizeSegmentedOptions(_options),
  })

  const [currentValue, handleOnChange] = useControlledState({
    defaultValue: fallback(defaultValue, normalizedOptions[0]?.value),
    onChange,
    value,
  })

  const [history, setHistory] = useExactState([null, currentValue])

  const [isShowThumb, setIsShowThumb] = useExactState(false)

  const returnEarly = useWatchValue(currentValue, () => {
    setHistory([history[1], currentValue])

    setIsShowThumb(true)

    refs.update(currentValue)
  })

  const rootCssNames = { ...omit(cssNames, ['root', 'inner', 'item']), root: cssNames.item }
  const rootCssAttrs = { ...omit(cssAttrs, ['root', 'inner', 'item']), root: cssAttrs.item }

  const resolveTransform = (itemCoords: DOMRect) => {
    const innerCoords = getClientCoords(refs.inner)

    const delta = itemCoords.left - innerCoords.left

    return {
      transform: `translate3d(${delta}px, 0, 0)`,
      width: `${itemCoords.width}px`,
    }
  }

  const handleOnEnter = () => {
    const from = refs.items.get(history[0])

    if (!from || !refs.inner) return

    return resolveTransform(getClientCoords(from))
  }

  const handleOnEntering = () => {
    const target = refs.items.get(history[1])

    if (!target || !refs.inner) return

    return resolveTransform(getClientCoords(target))
  }

  const handleOnEntered = () => { setIsShowThumb(false) }

  useEffect(() => () => { refs.dispose() }, [refs])

  return {
    picked,
    omitted,
    refs,
    ns,
    cssNames,
    cssAttrs,
    restAttrs: {},
    rootCssNames,
    rootCssAttrs,
    normalizedOptions,
    currentValue,
    isShowThumb,
    returnEmpty: returnEarly,
    handleOnEnter,
    handleOnEntering,
    handleOnEntered,
    handleOnChange,
  }
}
