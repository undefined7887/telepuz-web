import EventEmitter from "./EventEmitter";

export default class Socket extends EventEmitter {
    private socket: WebSocket

    connect(addr: string) {
        this.socket = new WebSocket(`ws://${addr}`)
        this.socket.onmessage = this.onMessage.bind(this)
        this.socket.onclose = this.onClose.bind(this)
    }

    private onMessage(data: any) {
        super.emit("message", data)
    }

    private onClose() {
        super.emit("close", null)
    }
}