import React from "react";
import style from "./AuthPage.styl"
import Spacer from "../Spacer/Spacer";
import Authors from "../Authors/Authors";
import Form from "../Form/Form";
import Button from "../Button/Button";

import Socket from "../../lib/Socket";


const nicknameRegexp = /^[A-zА-яЁё0-9 ]{1,30}$/

interface Props {
    socket: Socket
    onClose?: () => void
}

interface UsersCreateReply {
    result: 0 | 1
}

export default class AuthPage extends React.Component<Props> {
    private socket = this.props.socket
    private form = React.createRef<Form>()
    private button = React.createRef<Button>()

    private onFormEnterPress() {
        this.createUser(this.form.current.getValue())
    }

    private onButtonClick() {
        this.createUser(this.form.current.getValue())
    }

    private createUser(nickname: string) {
        if (!nicknameRegexp.test(nickname)) {
            this.form.current.updateLabel("Неправильный формат никнейма", true)
            return
        }

        this.socket.emit("users.create", {
            user_nickname: nickname
        })

        this.socket.once("users.create", (reply: UsersCreateReply) => {
            setTimeout(() => {
                this.button.current.update(false)

                if (reply.result) {
                    this.form.current.updateLabel("Неправильный формат никнейма", true)
                }

                this.props.onClose?.()
            }, 1000)
        })

        this.button.current.update(true)
        this.form.current.updateLabel("Никнейм", false)
    }

    render() {
        return (
            <div className={style.authPage}>
                <Spacer/>
                <div className={style.logo}>Telepuz</div>
                <div className={style.slogan}>Алё, ну чё там с деньгами?</div>
                <Form ref={this.form}
                      labelText="Никнейм"
                      inputText="Кто мы с тобой, орлы или вороны?"
                      onEnterPress={this.onFormEnterPress.bind(this)}/>
                <Button ref={this.button}
                        text="Войти"
                        onClick={this.onButtonClick.bind(this)}/>
                <Spacer/>
                <Authors/>
            </div>
        )
    }
}