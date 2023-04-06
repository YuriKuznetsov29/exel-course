import { ExcelComponent } from "../../core/ExcelComponent";
import { createHeader } from "./header.template";
import { $ } from "../../core/dom";
import { tableName } from "../../redux/actions";
import { ActiveRoute } from "../../core/routes/ActiveRoute";

export class Header extends ExcelComponent {
    static className = 'excel__header'
    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input', 'click'],
            ...options
        })
    }

    toHTML() {
        return createHeader(this.store.getState())
    }

    onInput(event) {
        const $target = $(event.target)
        if ($target.data.type === 'input') {
            this.$dispatch(tableName($target.text()))
        }
    }

    onClick(event) {
        const $target = $(event.target)
        console.log(event.target)
        if ($target.data.type === 'delete') {
            console.log('test')
            const key = ActiveRoute.path
            localStorage.removeItem(key)
            window.location.href = '/'
            console.log('test')
        }
    }
}