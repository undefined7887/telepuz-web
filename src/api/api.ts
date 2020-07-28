export interface UserObject {
    id: string
    nickname: string
    status: number
}

export interface MessageObject {
    id: string
    user_id: string
    text: string
}

export interface UsersCreateMessage {
    user_nickname: string
}

export interface UsersCreateReply {
    result: number
    user_id: string
}

export interface UsersGetMessage {}

export interface UsersGetReply {
    result: number
    users: UserObject[]
}

export interface UsersUpdateStatusMessage {
    user_status: number
}

export interface UsersUpdateStatusReply {
    result: number
}

export interface MessagesCreateMessage {
    message_text: string
}

export interface MessagesCreateReply {
    message_id: string
}

export interface UsersGetReply {
    result: number
    users: UserObject[]
}


export interface UsersCreatedMessage {
    user: UserObject
}

export interface UsersRemovedMessage {
    user_id: string
}

export interface UsersStatusUpdatedMessage {
    user_id: string
    user_status: number
}
export interface MessagesCreatedMessage {
    message: MessageObject
}