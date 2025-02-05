type E = HTMLDivElement

const handlers = {
  onEnter: (el: E) => {
    el.style.setProperty('height', '0px')
  },
  onEntering: (el: E) => {
    el.style.setProperty('height', `${el.scrollHeight}px`)
  },
  onEntered: (el: E) => {
    el.style.removeProperty('height')
  },
  onEnterCancel: (el: E) => {
    el.style.setProperty('height', `${el.offsetHeight}px`)
  },
  onExit: (el: E) => {
    el.style.setProperty('height', `${el.offsetHeight}px`)
  },
  onExiting: (el: E) => {
    el.style.setProperty('height', '0px')
  },
  onExited: (el: E) => {
    el.style.removeProperty('height')
  },
  onExitCancel: (el: E) => {
    el.style.setProperty('height', `${el.offsetHeight}px`)
  },
}

export default handlers
