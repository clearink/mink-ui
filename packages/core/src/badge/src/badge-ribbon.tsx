import type { BadgeRibbonProps } from './badge-ribbon.props'

import { defineName } from '../../_shared/utils/define-name'

function BadgeRibbon(props: BadgeRibbonProps) {
  return <div>{props.children}</div>
}

defineName(BadgeRibbon, 'Badge.Ribbon')

export default BadgeRibbon
