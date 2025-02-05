import { atIndex, makeEventListener, noop } from '@mink-ui/shared'

export interface TrapListenerEvents {
  onFocusIn: (e: FocusEvent) => void
  onKeyDown: (e: KeyboardEvent) => void
}

class TrapManager {
  get size() {
    return this.stack.length
  }

  private stack: TrapListenerEvents[] = []

  private keydownCleanup = noop

  private focusinCleanup = noop

  private init = (root: Document) => {
    const getTopEvent = (type: 'onFocusIn' | 'onKeyDown') => (e: any) => {
      const topListeners = atIndex(this.stack, -1)
      topListeners && topListeners[type](e)
    }

    this.keydownCleanup = makeEventListener(root, 'keydown', getTopEvent('onKeyDown'), true)

    this.focusinCleanup = makeEventListener(root, 'focusin', getTopEvent('onFocusIn'))
  }

  private cleanup = () => {
    this.keydownCleanup()
    this.focusinCleanup()
  }

  register = (root: Document, events: TrapListenerEvents) => {
    if (!this.stack.length) this.init(root)

    this.stack.push(events)

    return () => {
      this.stack = this.stack.filter(item => item !== events)

      if (!this.stack.length) this.cleanup()
    }
  }
}

export default new TrapManager()
