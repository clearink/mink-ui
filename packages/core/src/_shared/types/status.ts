export type CommonStatus = keyof typeof STATUS_ENUM

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                        constants                        |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export const STATUS_ENUM = { info: 'info', success: 'success', error: 'error', warning: 'warning' } as const
