import React from "react"
import styles from "./User.styl"
import {getUserColorByNickname} from "../../lib/utils";

interface Props {
    nickname: string
    status: number
}

export default class User extends React.Component<Props> {
    render() {
        let userColor = getUserColorByNickname(this.props.nickname)

        let status: React.ReactNode;
        switch (this.props.status) {
            case 0:
                status = <span className={styles.offline}>Отошел</span>
                break
            case 1:
                status = <span className={styles.online}>Онлайн</span>
                break
            case 2:
                status = (
                    <div className={styles.typing}>
                        <div className={styles.circle}/>
                        <div className={styles.circle}/>
                        <div className={styles.circle}/>
                        <span>Печатает</span>
                    </div>
                )
                break
        }

        return (
            <div className={styles.user}>
                <div className={styles.photo}
                     style={{background: userColor}}>
                    {this.props.nickname.charAt(0).toUpperCase()}
                </div>
                <div className={styles.info}>
                    <div className={styles.nickname}>{this.props.nickname}</div>
                    <div className={styles.status}>{status}</div>
                </div>
            </div>
        )
    }
}