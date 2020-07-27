import React from "react";
import style from "./AuthPage.styl"
import Spacer from "../Spacer/Spacer";
import AuthForm from "../AuthForm/AuthForm";
import Authors from "../Authors/Authors";
import Socket from "../../lib/Socket";
import {timeout} from "../../lib/utils";

const nicknameRegexp = /^[A-zА-яЁё0-9 ]{1,30}$/

interface Props {
    socket: Socket
    onReady?: (userId: string) => void
}

interface UsersCreateReply {
    result: 0 | 1
    user_id: string
}

export default class AuthPage extends React.Component<Props> {
    private socket = this.props.socket
    private form = React.createRef<AuthForm>()

    private onFormReady() {
        this.createUser(this.form.current.getValue())
    }

    private createUser(nickname: string) {
        let form = this.form.current

        if (!nicknameRegexp.test(nickname)) {
            form.update(true, "Неправильный формат никнейма", false)
            return
        }

        form.update(false, "Никнейм", true)

        this.socket.once("users.create", async (reply: UsersCreateReply) => {
            await timeout(1000)
            if (reply.result) {
                form.update(true, "Неправильный формат никнейма", false)
                return
            }

            this.props.onReady?.(reply.user_id)
        })

        this.socket.emit("users.create", {user_nickname: nickname})
    }

    render() {
        return (
            <div className={style.authPage}>
                <Spacer/>
                <div className={style.logo}>Telepuz</div>
                <div className={style.slogan}>Алё, ну чё там с деньгами?</div>
                <AuthForm ref={this.form}
                          labelText="Никнейм"
                          inputText="Кто мы с тобой, орлы или вороны?"
                          buttonText="Войти"
                          onReady={this.onFormReady.bind(this)}/>
                <Spacer/>
                <Authors/>
            </div>
        )
    }
}