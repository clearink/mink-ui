import type { UniqueTransitionItem } from './_shared.props'
import type { GroupTransitionProps } from './group-transition.props'

import { defineName } from '../../../utils/define-name'
import { useGroupTransitionProps } from './hooks/use-group-transition-props'

function GroupTransition<T extends UniqueTransitionItem>(props: GroupTransitionProps<T>) {
  const { returnEmpty, renderEntries } = useGroupTransitionProps<T>(props)

  return returnEmpty ? null : renderEntries()
}

defineName(GroupTransition)

export default GroupTransition
