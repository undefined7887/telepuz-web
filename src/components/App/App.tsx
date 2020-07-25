import React from "react";
import style from "./App.styl"
import AuthForm from "../AuthForm/AuthForm"
import Authors from "../Authors/Authors";
import Socket from "../../transport/Socket";

interface IProps {
    socket: Socket
}

export default class App extends React.Component<IProps, unknown> {
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