import React from "react"
import styles from "./MainPage.styl"
import {
    MessageObject,
    MessagesCreatedMessage, MessagesCreateMessage, MessagesCreateReply,
    UserObject,
    UsersCreatedMessage,
    UsersGetMessage,
    UsersGetReply,
    UsersRemovedMessage,
    UsersStatusUpdatedMessage, UsersUpdateStatusMessage, UsersUpdateStatusReply
} from "../../api/api";
import Socket from "../../lib/Socket";
import User from "../User/User";
import Message from "../Message/Message";
import Spacer from "../Spacer/Spacer";
import MessageForm from "../MessageForm/MessageForm";

interface Props {
    socket: Socket
    user: UserObject
}

interface State {
    users: Record<string, UserObject>
    messages: MessageObject[]
}

export default class MainPage extends React.Component<Props, State> {
    private socket = this.props.socket
    private firstMessage = true
    private messageForm = React.createRef<MessageForm>()
    private messagesContainer = React.createRef<HTMLDivElement>()

    private users: Record<string, UserObject> = {}
    private usersCopy: Record<string, UserObject> = {}

    private messages: MessageObject[] = []

    state = {
        users: {},
        messages: []
    }

    async componentDidMount() {
        let replyMessage: UsersGetReply =
            await this.socket.request("users.get", {} as UsersGetMessage)

        for (let i = 0; i < replyMessage.users.length; i++) {
            this.users[replyMessage.users[i].id] = replyMessage.users[i]
            this.usersCopy[replyMessage.users[i].id] = replyMessage.users[i]
        }
        this.setState({users: this.users})

        this.socket.on("users.created", (replyMessage: UsersCreatedMessage) => {
            this.users[replyMessage.user.id] = replyMessage.user
            this.usersCopy[replyMessage.user.id] = replyMessage.user
            this.setState({users: this.users})
        })

        this.socket.on("users.statusUpdated", (replyMessage: UsersStatusUpdatedMessage) => {
            this.users[replyMessage.user_id].status = replyMessage.user_status
            this.usersCopy[replyMessage.user_id].status = replyMessage.user_status
            this.setState({users: this.users})
        })

        this.socket.on("users.removed", (replyMessage: UsersRemovedMessage) => {
            delete this.users[replyMessage.user_id]
            this.setState({users: this.users})
        })

        this.socket.on("messages.created", (replyMessage: MessagesCreatedMessage) => {
            this.messages.push(replyMessage.message)
            this.setState({messages: this.messages})
        })

        window.onblur = () => {
            this.setMyStatus(0)
        }

        window.onfocus = () => {
            this.setMyStatus(1)
        }
    }

    componentDidUpdate() {
        this.messagesContainer.current.scrollTop = this.messagesContainer.current.scrollHeight
    }

    private async onMessageFormReady() {
        let message = this.messageForm.current.getValue()
        if (message == "") {
            return
        }

        this.messageForm.current.setValue("")

        let replyMessage: MessagesCreateReply =
            await this.socket.request("messages.create", {message_text: message} as MessagesCreateMessage)

        this.messages.push({id: replyMessage.message_id, user_id: this.props.user.id, text: message})
        this.setState({messages: this.messages})
    }

    private async onMessageFormStartPrinting() {
        await this.setMyStatus(2)
    }

    private async onMessageFormStopPrinting() {
        await this.setMyStatus(1)
    }

    private async setMyStatus(status: number) {
        this.users[this.props.user.id].status = status
        this.usersCopy[this.props.user.id].status = status
        await this.socket.request("users.updateStatus", {user_status: status} as UsersUpdateStatusMessage);
        this.setState({users: this.users})
    }

    render() {
        let users: React.ReactNode[] = []
        for (let id in this.state.users) {
            users.push(
                <User key={id}
                      nickname={this.state.users[id].nickname}
                      status={this.state.users[id].status}/>
            )
        }

        let messages: React.ReactNode[] = []
        let lastUserId = ""
        for (let i = 0; i < this.state.messages.length; i++) {
            if (lastUserId != this.state.messages[i].user_id) {
                lastUserId = this.state.messages[i].user_id
                this.firstMessage = true
            } else {
                this.firstMessage = false
            }

            messages.push(
                <Message key={this.state.messages[i].id}
                         my={this.state.messages[i].user_id === this.props.user.id}
                         first={this.firstMessage}
                         text={this.state.messages[i].text}
                         nickname={this.usersCopy[this.state.messages[i].user_id].nickname}/>
            )
        }

        return (
            <div className={styles.mainPage}>
                <div className={styles.logo}>Telepuz</div>
                <div className={styles.content}>
                    <div className={styles.users}>
                        <div className={styles.label}>Список телепузов в чате</div>
                        {users}
                    </div>
                    <div className={styles.messages}>
                        <div ref={this.messagesContainer}
                             className={styles.container}>
                            {messages}
                            <Spacer/>
                        </div>
                        <MessageForm ref={this.messageForm}
                                     onStartPrinting={this.onMessageFormStartPrinting.bind(this)}
                                     onStopPrinting={this.onMessageFormStopPrinting.bind(this)}
                                     onReady={this.onMessageFormReady.bind(this)}/>
                    </div>
                </div>
            </div>
        )
    }
}