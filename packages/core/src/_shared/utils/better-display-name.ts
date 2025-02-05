export function betterDisplayName<T>(WrappedComponent: T, explicitName?: string) {
  const Wrapped: any = WrappedComponent

  const __PROD__ = process.env.NODE_ENV === 'production'

  if (!__PROD__) Wrapped.displayName = explicitName || Wrapped.name
}
