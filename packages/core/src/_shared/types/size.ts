export type CommonSize = keyof typeof SIZE_ENUM | undefined

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                        constants                        |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export const SIZE_ENUM = { small: 'small', middle: 'middle', large: 'large' } as const
