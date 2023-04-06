function toHTML(_, i) {
    const key = localStorage.key(i)
    const storeCurrentTable = JSON.parse(localStorage.getItem(key))
    const name = storeCurrentTable.tableName
    // console.log(key)
    return `
    <li class="db__record">
        <a href="#${key}">${name}</a>
        <strong>12.06.2020</strong>
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