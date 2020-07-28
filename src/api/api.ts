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