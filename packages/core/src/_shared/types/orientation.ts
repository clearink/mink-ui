export type Orientation = keyof typeof ORIENTATION_ENUM

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                        constants                        |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export const ORIENTATION_ENUM = { horizontal: 'horizontal', vertical: 'vertical' } as const
