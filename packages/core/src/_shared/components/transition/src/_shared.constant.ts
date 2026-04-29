// phase
export const APPEAR = 0
export const ENTER = 1
export const EXIT = 2

export const isAppear = (phase: number) => phase === APPEAR
export const isEnter = (phase: number) => phase === ENTER
export const isExit = (phase: number) => phase === EXIT

// state
export const ENTERING = 'entering'
export const ENTERED = 'entered'
export const EXITING = 'exiting'
export const EXITED = 'exited'

export const isEntering = (state: string) => state === ENTERING
export const isEntered = (state: string) => state === ENTERED
export const isExiting = (state: string) => state === EXITING
export const isExited = (state: string) => state === EXITED

export const isRunning = (state: string) => isEntering(state) || isExiting(state)
