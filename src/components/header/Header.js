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
        if ($target.data.type === 'delete') {
            const decision = confirm('Вы действительно хотите удалить эту страницу?')
            if (decision) {
                const key = ActiveRoute.path
                localStorage.removeItem(key)
                ActiveRoute.navigate('')
            }
        } else if ($target.data.type === 'exit') {
            ActiveRoute.navigate('')
        }
    }
}