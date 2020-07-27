import React from "react";
import style from "./App.styl"
import Socket from "../../lib/Socket";
import Form from "../Form/Form";

export default class App extends React.Component {
    render() {
        return (
            <div className={style.container}>
                <Form label="Никнейм"
                      placeholder="Кто мы с тобой, орлы или вороны?"
                      onEnterPress={() => console.log("Enter pressed")}/>
            </div>
        )
    }
}