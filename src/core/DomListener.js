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
            console.log(method)
            console.log(listener)
            //addInventListener
            this.$root.on(listener, this[method])
        })
    }

    removeDOMListeners() {
        
    }
}

//input => onInput
function getMethodName(eventName) {
    return 'on' + capitalaze(eventName)
}