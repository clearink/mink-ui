// step
export const APPEAR = 0;
export const ENTER = 1;
export const EXIT = 2;
export const isAppear = (step) => step === APPEAR;
export const isEnter = (step) => step === ENTER;
export const isExit = (step) => step === EXIT;
// status
export const ENTERING = 'entering';
export const ENTERED = 'entered';
export const EXITING = 'exiting';
export const EXITED = 'exited';
export const isEntering = (status) => status === ENTERING;
export const isEntered = (status) => status === ENTERED;
export const isExiting = (status) => status === EXITING;
export const isExited = (status) => status === EXITED;
export const isRunning = (status) => isEntering(status) || isExiting(status);
