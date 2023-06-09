import { DomListener } from "@core/DomListener";

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
        this.store = options.store
        this.unsubscribers = []
        this.storeSub
        this.subscribe = options.subscribe || []
        this.prepare()
      }

      //Настраиваем наш компонент до init
      prepare() {

      }
    
      // Возвращает шаблон компонента
      toHTML() {
        return ''
      }

      //Уведомляем слушателей про событие event
      $emit(event, ...args) {
        this.emitter.emit(event, ...args)
      }

      //Подписываемся на события event
      $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn)
        this.unsubscribers.push(unsub)
      }

      $dispatch(action) {
        this.store.dispatch(action)
      }

      // $subscribe(fn) {
      //   this.storeSub = this.store.subscribe(fn)
      // }

      isWatching(key) {
        return this.subscribe.includes(key)
      }
    
      //Инициализируем компонент
      //Добавляем DOM слушателей
      init() {
        this.initDOMListeners()
      }

      //Удаляем компонент
      //Чистим слушатели
      destroy() {
        this.removeDOMListeners()
        this.unsubscribers.forEach(unsub => unsub())
        this.storeSub.unsubscribe()
      }
}