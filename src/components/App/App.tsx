import React from "react"
import styles from "./App.styl"
import AuthPage from "../AuthPage/AuthPage"
import User from "../User/User"
import Socket from "../../lib/Socket"

export default class App extends React.Component {
    private socket = new Socket("sudox.ru:5000")

    private onAuthPageReady(userId: string) {
        console.log(this.socket)
        alert(`Successful auth, user_id: ${userId}`)
    }

    render() {
        return (
            <div className={styles.app}>
                <User nickname="undefined" status={1}/>
            </div>
        )
    }
}