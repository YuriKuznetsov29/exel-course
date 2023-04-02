import { $ } from "../../core/dom"

export function resizeHandler(event, root) {
    return new Promise(resolve => {
        if (event.target.dataset.resize) {
            const $resizer = $(event.target) // получаем instance класса dom
            // const $parent = $resizer.parentNode // bad так как в таком случае мы зависим от верстки и в случае ее изменения придется менять логику
            // const $parent = $resizer.closest('.column') // better but bad
            $resizer.css({opacity: 1})
            const $parent = $resizer.closest('[data-type="resizable"]')
            const coords = $parent.getCoords()
            const cells = root.findAll(`[data-col="${$parent.data.col}"]`)
            const type = $resizer.data.resize
            let value = 0
            if (type === 'col') {
                document.onmousemove = e => {
                    const delta = e.pageX - coords.right
                    value = coords.width + delta
                    $resizer.css({ left: value - 4 + 'px'})
                }
            } else {
                document.onmousemove = e => {
                    const delta = e.pageY - coords.bottom - window.pageYOffset
                    value = coords.height + delta
                    $resizer.css({ top: value - 4 + 'px'})
                }
            }
            document.onmouseup = () => {
                if (type === 'col') {
                    $parent.css({ width: value + 'px'})
                    cells.forEach(el => el.style.width = value + 'px')
                } else {
                    $parent.css({height: value + 'px'})
                    // document.querySelectorAll('.row-info').forEach((el, i) => console.log(el.getBoundingClientRect().bottom, i))
                }

                resolve({
                    value,
                    type,
                    id: type === 'col' ? $parent.data.col : $parent.data.row,
                })

                $resizer.css({opacity: 0})
                document.onmousemove = null
                document.onmouseup = null
            }
        }
    }) 
}