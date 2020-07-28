import React from "react"
import styles from "./Message.styl"
import {classes, getUserColorByNickname} from "../../lib/utils";

interface Props {
    first: boolean
    my: boolean
    text: string
    nickname: string
}

export default class Message extends React.Component<Props> {
    render() {
        let userColor = getUserColorByNickname(this.props.nickname)
        let messagesClasses = classes({
            [styles.message]: true,
            [styles.notFirst]: !this.props.first,
            [styles.my]: this.props.my
        })

        return (
            <div className={messagesClasses}>
                <div className={styles.photo}
                     style={{background: userColor}}>
                    {this.props.nickname.charAt(0).toUpperCase()}
                </div>
                <div className={styles.content}>
                    <div className={styles.nickname}
                         style={{color: userColor}}>
                        {this.props.nickname}
                    </div>
                    <div className={styles.text}>
                        {this.props.text}
                    </div>
                </div>
            </div>
        )
    }
}