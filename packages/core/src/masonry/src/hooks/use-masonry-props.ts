import type { MasonryProps, OmittedMasonryProps, PickedMasonryProps } from '../masonry.props'

import { toArray } from '@mink-ui/shared/array/to-array'
import { omit } from '@mink-ui/shared/object/omit'

import { useCombinedSemantics } from '../../../_shared/hooks/use-settings/use-combined'
import { useConfiguration } from '../../../_shared/hooks/use-settings/use-configuration'
import { defaultMasonryProps as defaultProps } from '../masonry.props'
import { useMasonryClassNames } from './use-class-names'
import { useMasonryLayouts } from './use-masonry-layouts'

export function useMasonryProps<V>(props: MasonryProps<V>) {
  const globalConfig = useConfiguration('masonry')

  const {
    items: _items,
    gutter = defaultProps.gutter,
    columns = defaultProps.columns,
  } = props

  const items = toArray(_items, true)

  const omitted = props as OmittedMasonryProps<V>
  const picked: PickedMasonryProps<V> = { items, gutter, columns }

  const {
    ctrl,
    cols,
    rootCssVars,
    itemCssVars,
    hasLayoutChanged,
    handleReLayout,
  } = useMasonryLayouts(picked, omitted)

  const { ns, classNames } = useMasonryClassNames(omitted)

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
      { root: rootCssVars },
    ],
    { meta: { ...omitted, ...picked, items, columns: cols } },
  )

  const outerCssNames = { ...omit(cssNames, ['root', 'item']), root: cssNames.item }
  const outerCssAttrs = { ...omit(cssAttrs, ['root', 'item']), root: cssAttrs.item }

  return {
    picked,
    omitted,
    ns,
    cssNames,
    cssAttrs,
    ctrl,
    itemCssVars,
    outerCssNames,
    outerCssAttrs,
    returnEmpty: hasLayoutChanged,
    handleReLayout,
  }
}
