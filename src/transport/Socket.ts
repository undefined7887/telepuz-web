import EventEmitter from "../utils/EventEmitter";
import {encode, decodeStream} from "@msgpack/msgpack"

export default class Socket extends EventEmitter {
    private socket: WebSocket

    connect(addr: string) {
        this.socket = new WebSocket(`ws://${addr}`)
        this.socket.onopen = this.onOpen.bind(this)
        this.socket.onmessage = this.onMessage.bind(this)
        this.socket.onclose = this.onClose.bind(this)
    }

    emit(path: string, message: object) {
        let encodedPath = encode(path)
        let encodedMessage = encode(message)

        let packet = new Uint8Array(encodedPath.length + encodedMessage.length)
        packet.set(encodedPath)
        packet.set(encodedMessage, encodedPath.length)

        this.socket.send(packet)
    }

    private onOpen() {
        super.emit("open");
    }

    private async onMessage(event: {data: Blob}) {
        let array = []

        for await (let item of await decodeStream(event.data.stream())) {
            array.push(item)
        }

        let [path, message] = array
        if (typeof path !== "string" || typeof message !== "object") {
            return
        }

        super.emit(path, message)
    }

    private onClose() {
        super.emit("close")
    }
}