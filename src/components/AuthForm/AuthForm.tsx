import React from "react";
import style from "./AuthForm.styl"

interface IState {
    buttonActive: boolean
}

export default class AuthForm extends React.Component<unknown, IState> {
    state = {buttonActive: false}

    onKeyUp(event: React.ChangeEvent<HTMLInputElement>) {
        let value = event.target.value

        if (value === '' && this.state.buttonActive) {
            this.setState({buttonActive: false})
            return
        }

        if (value !== '' && !this.state.buttonActive) {
            this.setState({buttonActive: true})
        }
    }

    render() {
        return (
            <div className={style.container}>
                <div className={style.logo}>Telepuz</div>
                <div className={style.slogan}>Алё, ну чё там с деньгами?</div>
                <div className={style.form}>
                    <div className={style.label}>Никнейм</div>
                    <input className={style.input}
                           onKeyUp={this.onKeyUp.bind(this)}
                           placeholder="Кто мы с тобой орлы или вороны?"/>
                </div>
                <div className={this.state.buttonActive ? style.activeButton : style.button}>Войти</div>
            </div>
        )
    }
}