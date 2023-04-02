function toButton(button) {
    const meta = `
    data-type="button"
    data-value='${JSON.stringify(button.value)}'
    `
    return `<div class="button" ${meta}>
        <span class="material-symbols-outlined" ${meta}>
        ${button.icon}
        </span>
    </div>`
}

export function createToolbar(state) {
    const buttons = [
        {
            icon: 'format_align_left',
            active: false,
            value: {textAlign: 'left'}
        },
        {
            icon: 'format_align_justify',
            active: false,
            value: {textAlign: 'center'}
        },
        {
            icon: 'format_align_right',
            active: false,
            value: {textAlign: 'right'}
        },
        {
            icon: 'format_bold',
            active: state['fontWeigth'] === 'bold',
            value: {fontWeigth: state['fontWeigth'] === 'bold' ? 'normal' : 'bold'}
        },
        {
            icon: 'format_italic',
            active: false,
            value: {fontStyle: 'italic'}
        },
        {
            icon: 'format_underlined',
            active: false,
            value: {textDecoration: 'underline'}
        },
    ]

    return buttons.map(toButton).join('')
}
    