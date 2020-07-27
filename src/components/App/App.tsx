import React from "react"
import styles from "./App.styl"
import AuthPage from "../AuthPage/AuthPage";
import Socket from "../../lib/Socket"

export default class App extends React.Component {
    private socket = new Socket("sudox.ru:5000")

    constructor(props) {
        super(props);

        console.log("Constructor called")
    }

    render() {
        return (
            <div className={styles.app}>
                <AuthPage socket={this.socket}/>
            </div>
        )
    }
}