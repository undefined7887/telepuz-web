import EventEmitter from "./EventEmitter";
import {encode, decodeStream} from "@msgpack/msgpack"

type Events = "open" | "close"
type Callback = (message?: object) => void

interface BlobMessageEvent extends MessageEvent {
    readonly data: Blob
}

export default class Socket extends EventEmitter {
    private readonly addr: string
    private socket: WebSocket

    constructor(addr: string) {
        super();
        this.addr = addr
        this.connect()
    }

    connect() {
        this.socket = new WebSocket(`ws://${this.addr}`)
        this.socket.onopen = this.onOpen.bind(this)
        this.socket.onclose = this.onClose.bind(this)
        this.socket.onmessage = this.onMessage.bind(this)
    }

    on(path: Events | string, callback: Callback) {
        super.on(path, callback);
    }

    once(path: Events | string, callback: Callback) {
        super.once(path, callback);
    }

    off(path: Events | string, callback: Callback) {
        super.off(path, callback);
    }

    emit(path: string, message: object) {
        this.socket.send(concatUint8Arrays(encode(path), encode(message)))
    }

    private onOpen() {
        super.emit("open")
    }

    private onClose() {
        super.emit("close")
    }

    private async onMessage(event: BlobMessageEvent) {
        let items = []
        for await (let item of decodeStream(event.data.stream())) {
            items.push(item)
        }

        let [path, message] = items
        if (typeof path !== "string" || typeof message !== "object") {
            return
        }

        super.emit(path, message)
    }
}

function concatUint8Arrays(...arrays: Uint8Array[]): Uint8Array {
    let length = 0
    for (let i = 0; i < arrays.length; i++) {
        length += arrays[i].length
    }

    let res = new Uint8Array(length)
    let index = 0
    for (let i = 0; i < arrays.length; i++) {
        res.set(arrays[i], index)
        index += arrays[i].length
    }

    return res
}
