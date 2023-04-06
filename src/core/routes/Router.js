import { $ } from '@core/dom'
import { ActiveRoute } from './ActiveRoute'

export class Router {
    constructor(selector, routes) {
        if (!selector) {
            throw new Error('Selector is not provided in Router')
        }
        this.$placeholder = $(selector)
        this.routes = routes
        this.page = null
        this.changePageHandler = this.changePageHandler.bind(this) // привязываем контекст
        this.init()
    }

    init() {
        window.addEventListener('hashchange', this.changePageHandler) // здесь теряется контекст, поэтому привязываем его в конструкторе. Если не привязать контекст, то контекстом будет window
        // так как у window нет метода window.changePageHandler, поэтому this будет undefined
        this.changePageHandler()
    }

    changePageHandler() {
        if (this.page) {
            this.page.destroy()
        }
        this.$placeholder.clear()
        const Page = ActiveRoute.path.includes('excel') ? 
        this.routes.excel : 
        this.routes.dashboard

        this.page = new Page(ActiveRoute.path)
        console.log(ActiveRoute.path)
        this.$placeholder.append(this.page.getRoot())

        this.page.afterRender()
    }

    destroy() {
        window.removeEventListener('hashchange', this.changePageHandler) // благодаря ручной привязке контекста, мы можем удалить обоаботчик события
    }
}