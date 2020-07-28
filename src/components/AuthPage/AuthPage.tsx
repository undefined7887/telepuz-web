import React from "react";
import style from "./AuthPage.styl"
import Spacer from "../Spacer/Spacer";
import AuthForm from "../AuthForm/AuthForm";
import Authors from "../Authors/Authors";
import Socket from "../../lib/Socket";
import {timeout} from "../../lib/utils";
import {UsersCreateMessage, UsersCreateReply} from "../../api/api";

const nicknameRegexp = /^[A-zА-яЁё0-9 ]{1,30}$/

interface Props {
    socket: Socket
    onReady?: (userId: string) => void
}

export default class AuthPage extends React.Component<Props> {
    private socket = this.props.socket
    private form = React.createRef<AuthForm>()

    private onFormReady() {
        let nickname = this.form.current.getValue()

        this.socket.once("users.create", async (replyMessage: UsersCreateReply) => {
            await timeout(1000)
            this.props.onReady?.(replyMessage.user_id)
        })

        this.socket.emit("users.create", {user_nickname: nickname} as UsersCreateMessage)
    }

    render() {
        return (
            <div className={style.authPage}>
                <Spacer/>
                <div className={style.logo}>Telepuz</div>
                <div className={style.slogan}>Алё, ну чё там с деньгами?</div>
                <AuthForm ref={this.form}
                          regexp={nicknameRegexp}
                          onReady={this.onFormReady.bind(this)}/>
                <Spacer/>
                <Authors/>
            </div>
        )
    }
}