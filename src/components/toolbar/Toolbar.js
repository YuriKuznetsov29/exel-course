import { ExcelComponent } from "../../core/ExcelComponent";
import { createToolbar } from "./toolbar.template";
import { $ } from "../../core/dom"
import { ExcelStateComponent } from "../../core/ExcelStateComponent";

export class Toolbar extends ExcelStateComponent {
    static className = 'excel__toolbar'

    constructor($root, options) {
        super($root, {
            name: 'Toolbar',
            listeners: ['click'],
            ...options
        })
    }

    prepare() {
        this.initState({
            textAlign: 'left',
            fontWeigth: 'normal',
            textDecoration: 'none',
            fontStyle: 'normal'
        })
    }

    get template() {
        return createToolbar(this.state)
    }

    toHTML() {
        return this.template
    }

    onClick(event) {
        const $target = $(event.target)
        if ($target.data.type === 'button') {
            const value = JSON.parse($target.data.value)
            const key = Object.keys(value)[0]
            this.setState({[key]: value[key]})
            console.log(this.state, key, value[key])
        }
    }
}