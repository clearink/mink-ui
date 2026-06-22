import type { MasonryItemProps } from './masonry-item.props'

import { defineName } from '../../_shared/utils/define-name'
import { useMasonryItemProps } from './hooks/use-masonry-item-props'

function MasonryItem<V>(props: MasonryItemProps<V>) {
  const {
    omitted,
    cssNames,
    cssAttrs,
    refComposed,
    renderSlots,
  } = useMasonryItemProps(props)

  const { item } = omitted

  const { children } = item

  return (
    <div ref={refComposed} className={cssNames.root} style={cssAttrs.root}>
      {renderSlots({ name: 'item', children, params: item })}
    </div>
  )
}

defineName(MasonryItem, 'Masonry.Item')

export default MasonryItem
