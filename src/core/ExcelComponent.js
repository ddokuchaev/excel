import { DomListener } from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.unsubscribes = []
    this.prepare()
  }
  // Return template component
  toHTML() {
    return ''
  }

  // Notificate on event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  // Subscribe on event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribes.push(unsub)
  }

  // set up component before init
  prepare() {}

  // initialize component
  // Add DOM listeners
  init() {
    this.initDOMListeners()
  }

  // Remove component
  // clear listeners
  destroy() {
    this.removeDOMListeners()
    this.unsubscribes.forEach((usub) => unsub())
  }
}
