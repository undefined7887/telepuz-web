import React from "react"
import styles from "./App.styl"
import AuthPage from "../AuthPage/AuthPage";
import Socket from "../../lib/Socket"
import Message from "../Message/Message";
import User from "../User/User";

export default class App extends React.Component {
    private socket = new Socket("sudox.ru:5000")

    private onAuthPageReady(userId: string) {
        console.log(this.socket)
        alert(`Successful auth, user_id: ${userId}`)
    }

    render() {
        return (
            <div className={styles.app}>
                <Message nickname="undef"
                         text="Hello world"
                         first={true}/>

                <User nickname="undef" status={2}/>
            </div>
        )
    }
}