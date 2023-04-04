import { ExcelComponent } from "../../core/ExcelComponent";
import { createHeader } from "./header.template";
import { $ } from "../../core/dom";
import { tableName } from "../../redux/actions";

export class Header extends ExcelComponent {
    static className = 'excel__header'
    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input'],
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
}