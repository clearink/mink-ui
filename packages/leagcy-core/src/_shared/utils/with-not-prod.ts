import { execute, noop } from '@mink-ui/shared'

const isProd = process.env.NODE_ENV === 'production'

export const withNotProd = isProd ? noop : execute
