import type { KeyboardKey } from '../../../_shared/types/keyboard'

import { KEYBOARD_ENUM } from '../_shared.constant'

export function isKeyPressed(e: KeyboardEvent, key: KeyboardKey): boolean {
  return e.key === KEYBOARD_ENUM[key]
}
