import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App/App'
import Socket from "./lib/Socket";

let socket = new Socket()

ReactDOM.render(
    <App socket={socket}/>,
    document.getElementById('app')
)
