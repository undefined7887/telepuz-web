import React from "react"
import styles from "./ConnectionPage.styl"

export default class ConnectionPage extends React.Component {
    render() {
        return (
            <div className={styles.connectionPage}>
                <div className={styles.text}>Упс... :(</div>
                <div className={styles.hint}>
                    <span>Кажется, соединение разорвалось,</span>
                    <br/>
                    <span>переподключение...</span>
                </div>
            </div>
        )
    }
}