import React from "react";
import style from "./AuthPage.styl"
import Spacer from "../Spacer/Spacer";
import AuthForm from "../AuthForm/AuthForm";
import Authors from "../Authors/Authors";
import Socket from "../../lib/Socket";
import {timeout} from "../../lib/utils";
import {UserObject, UsersCreateMessage, UsersCreateReply} from "../../api/api";


const REQUEST_TIMEOUT = 1000
const NICKNAME_REGEXP = /^[A-zА-яЁё0-9 ]{1,30}$/
const STATUS_ONLINE = 1

interface Props {
    socket: Socket
    onReady?: (user: UserObject) => void
}

export default class AuthPage extends React.Component<Props> {
    private socket = this.props.socket
    private form = React.createRef<AuthForm>()

    private async onFormReady() {
        let nickname = this.form.current.getValue()

        let replyMessage: UsersCreateReply =
            await this.socket.request("users.create", {user_nickname: nickname} as UsersCreateMessage)

        await timeout(REQUEST_TIMEOUT)
        this.props.onReady?.({id: replyMessage.user_id, nickname, status: STATUS_ONLINE})
    }

    render() {
        return (
            <div className={style.authPage}>
                <Spacer/>
                <div className={style.logo}>Telepuz</div>
                <div className={style.slogan}>Алё, ну чё там с деньгами?</div>
                <AuthForm ref={this.form}
                          regexp={NICKNAME_REGEXP}
                          onReady={this.onFormReady.bind(this)}/>
                <Spacer/>
                <Authors/>
            </div>
        )
    }
}