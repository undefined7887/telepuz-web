import React from "react"
import styles from "./App.styl"
import AuthPage from "../AuthPage/AuthPage";
import Socket from "../../lib/Socket"
import MainPage from "../MainPage/MainPage";
import ConnectionPage from "../ConnectionPage/ConnectionPage";
import {timeout} from "../../lib/utils";
import {UserObject} from "../../api/api";

interface State {
    page: string
    user: UserObject
}

const RECONNECT_TIMEOUT = 3000

export default class App extends React.Component<unknown, State> {
    private readonly socket: Socket

    constructor(props: unknown) {
        super(props);

        this.socket = new Socket("theseems.ru/telepuz/api")

        this.socket.on("open", () => {
            this.setState({page: "auth", user: null})
        })

        this.socket.on("close", async () => {
            this.setState({page: "connection", user: null})

            await timeout(RECONNECT_TIMEOUT)
            this.socket.connect()
        })
    }

    state = {
        page: "auth",
        user: null
    }

    private onAuthPageReady(user: UserObject) {
        this.setState({page: "main", user})
    }

    render() {
        let page: React.ReactNode
        switch (this.state.page) {
            case "auth":
                page = <AuthPage socket={this.socket}
                                 onReady={this.onAuthPageReady.bind(this)}/>
                break
            case "main":
                page = <MainPage socket={this.socket} user={this.state.user}/>
                break

            case "connection":
                page = <ConnectionPage/>
        }

        return (
            <div className={styles.app}>
                {page}
            </div>
        )
    }
}
