import { capitalaze } from "./utils"

export class DomListener {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error('No $root provided for DomListener!')
        }
        this.$root = $root
        this.listeners = listeners
    }

    initDOMListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            if (!this[method]) {
                throw new Error(`Method ${method} is not implimented in ${this.name || ''} Component`)
            }
            this[method] = this[method].bind(this)
            //addInventListener
            this.$root.on(listener, this[method].bind(this))
        })
    }

    removeDOMListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            this.$root.off(listener, this[method])
        })
    }
}

//input => onInput
function getMethodName(eventName) {
    return 'on' + capitalaze(eventName)
}