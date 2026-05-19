export type SetStateDispatch<S> = (updater: (prevState: S) => S) => any
