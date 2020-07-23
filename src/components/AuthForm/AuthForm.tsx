import React from "react";
import style from "./AuthForm.styl"

export default class AuthForm extends React.Component {
    render() {
        return (
            <div className={style.container}>
                <div className={style.logo}>Telepuz</div>
                <div className={style.slogan}>Алё, ну чё там с деньгами?</div>
                <div className={style.form}>
                    <div className={style.label}>Никнейм</div>
                    <input className={style.input}
                           placeholder="Кто мы с тобой орлы или вороны?"/>
                </div>
                <div className={style.button}>Войти</div>
            </div>
        )
    }
}