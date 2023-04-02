export function createStore(rootReducer, initialState = {}) {
    let state = rootReducer({...initialState}, {type: '__INIT__'})
    let listeners = []

    return {
        subscribe(fn) {
            listeners.push(fn)
            return {
                unsubscribe() {
                    listeners = listeners.filter(el => el !== fn)
                }
            }
        },
        dispatch(action) {
            state = rootReducer(state, action) // обновляем state
            listeners.forEach(listener => listener(state)) // запускаем функции отправленные при подписке и передаем в них обновленный state
        },
        getState() {
            return JSON.parse(JSON.stringify(state))
        }

    }
}

// export class CreateStore {
//     constructor(rootReducer, initialState = {}) {
//         this.state = rootReducer({...initialState}, {type: '__INIT__'})
//         this.listeners = []
//         this.reducer = rootReducer
//     }

//     subscribe(fn) {
//         this.listeners.push(fn)
//         return () => {
//             this.listeners = this.listeners.forEach(el => el !== fn)
//         }
//     }

//     dispatch(action) {
//         this.state = this.reducer(this.state, action)
//         this.listeners.forEach(listener => listener(this.state))
//     }

//     getState() {
//         return this.state
//     }
// }