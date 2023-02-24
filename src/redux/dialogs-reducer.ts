import {ActionsTypes} from "./redux-store";

const SEND_MESSAGE = "SEND-MESSAGE"

export type DialogsPageType = {
    messages: MessagesType[]
    dialogs: DialogsType[]
    isAuth?: boolean
}
export type DialogsType = {
    id: string
    name: string
}
export type MessagesType = {
    id: number
    message: string
}

let initialState: DialogsPageType = {
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How is your it-kamasutra'},
        {id: 3, message: 'Yo'},
    ],
    dialogs: [
        {id: '1', name: 'Dimych'},
        {id: '2', name: 'Andrey'},
        {id: '3', name: 'Sveta'},
        {id: '4', name: 'Sasha'},
        {id: '5', name: 'Victor'},
        {id: '6', name: 'Valera'},
    ],
}

export const dialogsReducer = (state: DialogsPageType = initialState, action: ActionsTypes): DialogsPageType => {
    switch (action.type) {
        case "SEND-MESSAGE":
            let newMessage: MessagesType = {
                id: new Date().getTime(),
                message: action.newMessageBody
            }
            return {
                ...state,
                messages: [...state.messages, newMessage],
            }

        default:
            return {
                ...state
            }
    }

}

type SendMessageCreatorActionType = {
    type: typeof SEND_MESSAGE
    newMessageBody: string
}
export const sendMessageCreator = (newMessageBody: string): SendMessageCreatorActionType => {
    return {
        type: "SEND-MESSAGE",
        newMessageBody
    } as const
}



