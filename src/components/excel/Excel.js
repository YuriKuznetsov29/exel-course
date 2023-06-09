import { $ } from "../../core/dom"
import { Emitter } from "../../core/Emitter"
import { StoreSubscriber } from "../../core/StoreSubscriber"
import { openDate } from "../../redux/actions"

export class Excel {
    constructor(options) {
        // this.$el = $(selector)
        this.components = options.components || []
        this.emitter = new Emitter()
        this.store = options.store
        this.subscriber = new StoreSubscriber(this.store)
    }

    getRoot() {
        const $root = $.create('div', 'exel')

        const componentOptions = {
            emitter: this.emitter,
            store: this.store
        }

        this.components = this.components.map(Component => {
            const $el = $.create('div', Component.className)
            const component = new Component($el, componentOptions)
            //DEBUG
            // if (component.name) {
            //     window['c' + component.name] = component
            // }
            $el.html(component.toHTML())
            $root.append($el)
            return component
        });
        
        return $root
    }

    init() {
        // this.$el.append(this.getRoot())
        this.subscriber.subscribeComponents(this.components)
        this.components.forEach(component => component.init())
        console.log(process.env.NODE_ENV)
        if (process.env.NODE_ENV === 'production') {
            document.addEventListener('contextmenu', (e) => {
                e.preventDefault()
            })
        }
    }

    destroy() {
        this.subscriber.unsubscribeFromStore()
        this.components.forEach(component => component.destroy())
    }
}