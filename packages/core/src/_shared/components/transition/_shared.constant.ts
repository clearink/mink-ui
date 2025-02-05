// step
export const APPEAR = 0
export const ENTER = 1
export const EXIT = 2

export const isAppear = (step: number) => step === APPEAR
export const isEnter = (step: number) => step === ENTER
export const isExit = (step: number) => step === EXIT

// status
export const ENTERING = 'entering'
export const ENTERED = 'entered'
export const EXITING = 'exiting'
export const EXITED = 'exited'

export const isEntering = (status: string) => status === ENTERING
export const isEntered = (status: string) => status === ENTERED
export const isExiting = (status: string) => status === EXITING
export const isExited = (status: string) => status === EXITED

export const isRunning = (status: string) => isEntering(status) || isExiting(status)
