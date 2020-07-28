import React from "react"
import styles from "./User.styl"
import {UserObject} from "../../api/api";
import Photo from "../Photo/Photo";

export default class User extends React.Component<UserObject> {
    render() {
        let status: React.ReactNode;

        switch (this.props.status) {
            case 0:
                status = (
                    <span className={styles.offline}>Отошел</span>
                )
                break
            case 1:
                status = (
                    <span className={styles.online}>Онлайн</span>
                )
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
                <Photo nickname={this.props.nickname}
                       diameter="55px"
                       fontSize="20px"/>
                <div className={styles.info}>
                    <div className={styles.nickname}>{this.props.nickname}</div>
                    <div className={styles.status}>{status}</div>
                </div>
            </div>
        )
    }
}