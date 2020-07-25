import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App/App'
import Socket from "./transport/Socket";

let socket = new Socket()
socket.connect("sudox.ru:5000")

socket.on("open", () => {
    console.log("Connected to server");

    socket.emit("users.get", {});
})

ReactDOM.render(
    <React.StrictMode>
        <App socket={socket}/>
    </React.StrictMode>,
    document.getElementById('app')
)
