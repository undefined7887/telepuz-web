type Callback = (data?: unknown) => void

interface Handler {
    once: boolean,
    callback: Callback
}

export default class EventEmitter {
    private listeners: Record<string, Array<Handler>> = {}

    on(path: string, callback: Callback) {
        if (!this.listeners[path]) {
            this.listeners[path] = []
        }
        this.listeners[path].push({once: false, callback})
    }

    once(path: string, callback: Callback) {
        if (!this.listeners[path]) {
            this.listeners[path] = []
        }
        this.listeners[path].push({once: true, callback})
    }

    off(path: string, callback: Callback) {
        if (!this.listeners[path]) {
            return
        }

        let listeners: Array<Handler> = []
        for (let handler of this.listeners[path]) {
            if (handler.callback !== callback) {
                listeners.push(handler)
            }
        }

        if (listeners.length) {
            this.listeners[path] = listeners
        } else {
            delete this.listeners[path]
        }
    }

    emit(path: string, data?: unknown) {
        if (!this.listeners[path]) {
            return
        }

        for (let handler of this.listeners[path]) {
            handler.callback(data)

            if (handler.once) {
                this.off(path, handler.callback)
            }
        }
    }
}