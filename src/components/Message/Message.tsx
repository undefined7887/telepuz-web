import React from "react"
import styles from "./Message.styl"
import {MessageObject, UserObject} from "../../api/api";
import Photo from "../Photo/Photo";

interface Props {
    user: UserObject
    message: MessageObject
    first: boolean
}

export default class Message extends React.Component<Props> {
    render() {
        return (
            <div className={styles.message}>
                <Photo nickname={this.props.user.nickname}
                       diameter="35px"
                       fontSize="16px"/>
                <div className={styles.content}>
                    <div className={styles.nickname}
                         style={{color: Photo.getBackground(this.props.user.nickname)}}>
                        {this.props.user.nickname}
                    </div>
                    <div className={styles.text}>
                        {this.props.message.text}
                    </div>
                </div>
            </div>
        )
    }
}