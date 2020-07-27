import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App/App'
import Socket from "./lib/Socket";

let socket = new Socket("sudox.ru:5000")

ReactDOM.render(
    <App/>,
    document.getElementById('app')
)
