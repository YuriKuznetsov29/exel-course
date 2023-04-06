import { storage } from '../core/utils'

function toHTML(key) {
    const model = storage(key)
    // const storeCurrentTable = JSON.parse(localStorage.getItem(key))
    const name = model.tableName
    const date = model.openDate
    // console.log(key)
    return `
    <li class="db__record">
        <a href="#${key}">${name}</a>
        <strong>
            ${new Date(date).toLocaleDateString()}
            ${new Date(date).toLocaleTimeString()}
        </strong>
    </li>`
}

function getAllKeys() {
    const keys = []
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (!key.includes('excel')) {
        continue
        }
        keys.push(key)
    }
    return keys
}

export function createRecordsTable() {
    const keys = getAllKeys()
    if (!keys.length) {
    return `<p>Вы пока не создали ни одной таблцы</p>`
    }
    return `<div class="db__list-header">
    <span>Название</span>
    <span>Дата открытия</span>
    </div>
    <ul class="db__list">
        ${keys.map(toHTML).join('')}
    </ul>`
}