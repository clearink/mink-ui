import type { GroupTransitionProps } from './group-transition.props'

import { defineName } from '../../../utils/define-name'
import { useGroupTransitionProps } from './hooks/use-group-transition-props'

function GroupTransition(props: GroupTransitionProps) {
  const { omitted, returnEmpty, renderEntries } = useGroupTransitionProps(props)

  const { children } = omitted

  return returnEmpty ? null : renderEntries(children)
}

defineName(GroupTransition)

export default GroupTransition
