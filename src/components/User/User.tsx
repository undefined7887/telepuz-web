import React from "react"
import styles from "./User.styl"

const photoColors: Array<string> = ["#d32d2f", "#ab47bc", "#00bcd4", "#ff6d00", "#00c853"]

interface Props {
    nickname: string
    status: 0 | 1 | 2 // 0 - offline, 1 - online, 2 - typing
}

export default class User extends React.Component<Props> {
    private getPhotoBackground(): string {
        let number = 0
        for (let i = 0; i < this.props.nickname.length; i++) {
            number += this.props.nickname.charCodeAt(i)
        }
        return photoColors[number % photoColors.length]
    }

    private getInitials(): string {
        return this.props.nickname.charAt(0).toUpperCase()
    }

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
                <div className={styles.photo}
                     style={{background: this.getPhotoBackground()}}>
                    {this.getInitials()}
                </div>
                <div className={styles.info}>
                    <div className={styles.nickname}>{this.props.nickname}</div>
                    <div className={styles.status}>{status}</div>
                </div>
            </div>
        )
    }
}