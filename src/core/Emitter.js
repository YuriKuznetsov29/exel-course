export class Emitter {
    constructor() {
        this.listeners = {}
    }

    //dispatch, fire, trigger
    //уведомляем слушателей если они есть
    emit(event, ...args) {
        if (!Array.isArray(this.listeners[event])) {
            return false
        }
        this.listeners[event].forEach(listener => {
            listener(...args)
        })
        return true
    }

    // on, listen
    // Подписываемся на уведомление
    //Добавляем нового слушателя
    // formula.subscribe('table:select', () => {})
    subscribe(event, fn) {
        this.listeners[event] = this.listeners[event] || []
        this.listeners[event].push(fn)
        return () => {
            this.listeners = this.listeners[event].filter(listener => listener !== fn)
        }
    }
}

// const test = new Emitter()

// const unSub = test.subscribe('Yuri', (age) => console.log(`age: ${age}`))
// test.emit('Yuri', 28)

// test.emit('Yui', 28)

// setTimeout(() => {
//     test.emit('Yuri', 28)
//     unSub()
// }, 1000)

// setTimeout(() => {
//     test.emit('Yuri', 30)
// }, 1500)