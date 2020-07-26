type Handler = {
    once: boolean,
    cb: (data: unknown) => void
}

export default class EventEmitter {
    private listeners: Record<string, Array<Handler>> = {}

    on(path: string, cb: (data?: unknown) => void) {
        this.listeners[path] = (this.listeners[path] || [])
            .concat({once: false, cb})
    }

    once(path: string, cb: (data?: unknown) => void) {
        this.listeners[path] = (this.listeners[path] || [])
            .concat({once: true, cb})
    }

    off(path: string, cb: (data?: unknown) => void) {
        this.listeners[path] = (this.listeners[path] || [])
            .filter(handler => handler.cb !== cb)
    }

    emit(path: string, data?: unknown) {
        (this.listeners[path] || []).forEach(handler => {
            handler.cb(data)

            if (handler.once) {
                this.off(path, handler.cb)
            }
        })
    }
}