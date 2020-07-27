import React from "react";
import style from "./App.styl"
import AuthPage from "../AuthPage/AuthPage"
import Authors from "../Authors/Authors";
import Socket from "../../lib/Socket";

interface Props {
    socket: Socket
}

interface State {
    page: number
}

interface UsersGetReply {
    result: number
}

export default class App extends React.Component<Props, State> {
    socket = this.props.socket
    state = {
        page: 1
    }

    constructor(props: Props) {
        super(props)

        console.log("Constructor called");

        // Connecting to server
        this.socket.connect("sudox.ru:5000")

        this.socket.on("open", () => {
            console.log("Connected to server")
        })

        this.socket.on("close", () => {
            console.log("Disconnected from server, reconnecting")
            this.socket.reconnect()
        })

        this.socket.once("users.get", (reply: UsersGetReply)  => {
            if (!reply.result) {
                alert("Changing fragments")
            }
        })
    }

    render() {
        return (
            <div className={style.container}>
                <div className={style.spacer}/>
                <AuthPage socket={this.socket}/>
                <div className={style.spacer}/>
                <Authors/>
            </div>
        )
    }
}