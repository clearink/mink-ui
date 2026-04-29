import type { CollapseProps } from './collapse.props'

import { fallback } from '@mink-ui/shared/function/fallback'
import { isArray } from '@mink-ui/shared/is/is-array'

import { defineName } from '../../_shared/utils/define-name'
import CollapseItem from './collapse-item'
import { useCollapseProps } from './hooks/use-collapse-props'

function Collapse(props: CollapseProps) {
  const {
    picked,
    omitted,
    ns,
    cssNames,
    cssAttrs,
    rootCssNames,
    rootCssAttrs,
    expandedNames,
    handleOnChange,
  } = useCollapseProps(props)

  const { collapsible, expandIcon, expandIconPlacement } = picked
  const { ref, items, accordion, keepMounted } = omitted

  return (
    <div
      ref={ref}
      className={cssNames.root}
      style={cssAttrs.root}
      role={accordion ? 'tablist' : undefined}
    >
      {isArray(items) && items.map(item => (
        <CollapseItem
          {...item}
          key={item.name}
          accordion={accordion}
          collapsible={fallback(item.collapsible, collapsible)}
          expanded={accordion ? expandedNames[0] === item.name : expandedNames.includes(item.name)}
          expandIcon={fallback(item.expandIcon, expandIcon)}
          expandIconPlacement={fallback(item.expandIconPlacement, expandIconPlacement)}
          keepMounted={fallback(item.keepMounted, keepMounted)}
          rootCssAttrs={rootCssAttrs}
          rootCssNames={rootCssNames}
          rootNamespace={ns}
          onChange={handleOnChange}
        />
      ))}
    </div>
  )
}

defineName(Collapse)

export default Collapse
