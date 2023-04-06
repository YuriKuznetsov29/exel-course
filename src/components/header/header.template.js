export function createHeader(state = {}) {
    const name = state.tableName
    return `<input type="text" class="input" value="${name}" data-type="input">
    <div>
        <div class="button" data-type="delete">
            <span class="material-symbols-outlined" data-type="delete">delete</span>
        </div>
        <div class="button" data-type="exit">
            <span class="material-symbols-outlined" data-type="exit">exit_to_app</span>
        </div>`
}