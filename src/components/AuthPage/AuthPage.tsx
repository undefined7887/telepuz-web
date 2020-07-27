import React from "react";
import style from "./AuthPage.styl"
import Socket from "../../lib/Socket";

const nicknameRegexp = /^[A-zА-яЁё0-9 ]{1,30}$/

interface Props {
    socket: Socket
}

interface State {
    labelText: string
    labelError: boolean
    buttonActive: boolean
}

interface UsersCreateReply {
    result: number
}

export default class AuthPage extends React.Component<Props, State> {
    socket = this.props.socket
    state = {
        labelText: "Никнейм",
        labelError: false,
        buttonActive: true,
    }
    inputFieldRef = React.createRef<HTMLInputElement>()

    async onButtonClick() {
        let nickname = this.inputFieldRef.current.value

        if (!nicknameRegexp.test(nickname)) {
            this.setState({
                labelText: "Неправильный формат никнейма",
                labelError: true
            })
            return
        }

        this.setState({
            labelText: "Никнейм",
            labelError: false,
            buttonActive: false
        })

        this.socket.emit("users.create", {
            user_nickname: nickname
        })
    }

    render() {
        return (
            <div className={style.container}>
                <div className={style.logo}>Telepuz</div>
                <div className={style.slogan}>Алё, ну чё там с деньгами?</div>
                <div className={style.form}>
                    <div className={this.state.labelError ? style.errorLabel : style.label}>
                        {this.state.labelText}
                    </div>
                    <input ref={this.inputFieldRef}
                           className={style.input}
                           placeholder="Кто мы с тобой орлы или вороны?"/>
                </div>
                <div className={this.state.buttonActive ? style.activeButton : style.button}
                     onClick={this.onButtonClick.bind(this)}>
                    Войти
                </div>
                <div className={style.container}>
                    Made for fun and test by<br/>
                    <a className={style.link}
                       href="https://github.com/undefined7887">
                        undefined
                    </a>
                    &nbsp;and&nbsp;
                    <a className={style.link}
                       href="https://github.com/KerJen">
                        KerJen
                    </a>
                </div>
            </div>
        )
    }
}