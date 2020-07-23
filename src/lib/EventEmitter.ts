export default class EventEmitter {
    private listeners: Record<string, Array<(data: any) => void>> = {}

    on(path: string, handler: (data: any) => void) {
        this.listeners[path] = (this.listeners[path] || []).concat(handler);
    }

    off(path: string, handler: (data: any) => void) {
        this.listeners[path] = (this.listeners[path] || []).filter(elem => elem !== handler);
    }

    emit(path: string, data: any) {
        console.log(this);
        (this.listeners[path] || []).forEach(handler => {
            handler(data)
        })
    }
}