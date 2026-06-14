import type { MasonryProps } from './masonry.props'

import { GroupTransition } from '../../_shared/components/transition/src'
import { defineName } from '../../_shared/utils/define-name'
import { useMasonryProps } from './hooks/use-masonry-props'
import MasonryItem from './masonry-item'

function Masonry<V = any>(props: MasonryProps<V>) {
  const {
    picked,
    omitted,
    ns,
    cssNames,
    cssAttrs,
    ctrl,
    itemCssVars,
    outerCssNames,
    outerCssAttrs,
    returnEmpty,
    handleReLayout,
  } = useMasonryProps<V>(props)

  const { items } = picked
  const { slots, observeItem } = omitted

  if (returnEmpty) return null

  return (
    <div
      ref={ctrl.$root}
      className={cssNames.root}
      style={cssAttrs.root}
      onError={handleReLayout}
      onLoad={handleReLayout}
    >
      <GroupTransition classNames={`${ns}-motion`} appear items={items!}>
        {($motion, getters, item) => (
          <MasonryItem
            ref={$motion}
            enabled={!!observeItem}
            getters={getters}
            item={item}
            outerCssAttrs={outerCssAttrs}
            outerCssNames={outerCssNames}
            outerCssVars={itemCssVars.get(item.key)}
            outerNamespace={ns}
            slots={slots}
            onCollect={ctrl.collect}
            onReLayout={handleReLayout}
          />
        )}
      </GroupTransition>
    </div>
  )
}

defineName(Masonry)

export default Masonry
