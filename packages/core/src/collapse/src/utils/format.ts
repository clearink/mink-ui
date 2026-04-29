import type { ExpandedName } from '../_shared.props'

import { toArray } from '@mink-ui/shared/array/to-array'

export function normalizeExpandedNames(
  names: ExpandedName | ExpandedName[] | undefined,
  accordion: boolean | undefined,
) {
  return accordion ? toArray(names).slice(0, 1) : toArray(names)
}
