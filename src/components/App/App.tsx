import React from "react";
import "./App.styl"

import AuthForm from "../AuthForm/AuthForm"
import Authors from "../Authors/Authors";

class App extends React.Component {
    render() {
        return (
            <div className="App-container">
                <div className="App-spacer"/>
                <AuthForm/>
                <div className="App-spacer"/>
                <Authors/>
            </div>
        )
    }
}

export default App;