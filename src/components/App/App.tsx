import React from "react";
import style from "./App.styl"
import AuthForm from "../AuthForm/AuthForm"
import Authors from "../Authors/Authors";
import Socket from "../../lib/Socket";

export default class App extends React.Component {
    render() {
        return (
            <div className={style.container}>
                <div className={style.spacer}/>
                <AuthForm/>
                <div className={style.spacer}/>
                <Authors/>
            </div>
        )
    }
}