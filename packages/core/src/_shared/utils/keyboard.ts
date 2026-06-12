import type { KeyboardKey } from '../types/keyboard'

import { KEYBOARD_ENUM } from '../types/keyboard'

/**
 * @description 判断是否按下某个键
 */
export function isPressKey(key: string, name: KeyboardKey): boolean {
  return key === KEYBOARD_ENUM[name]
}
