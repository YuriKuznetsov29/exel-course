export function createHeader(state = {}) {
    const name = state.tableName
    return `<input type="text" class="input" value="${name}" data-type="input">
    <div>
        <div class="button">
                <span class="material-symbols-outlined" data-type="delete">delete</span>
        </div>
        <div class="button">
            <a class="link" href="/" data-type="exit">
                <span class="material-symbols-outlined">exit_to_app</span>
            </a>
        </div>`
}