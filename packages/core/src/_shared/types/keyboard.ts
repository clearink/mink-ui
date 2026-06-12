export type KeyboardKey = keyof typeof KEYBOARD_ENUM

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                        constants                        |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export const KEYBOARD_ENUM = {
  enter: 'Enter',
  esc: 'Escape',
  shift: 'Shift',
  tab: 'Tab',
} as const
