import {ActionsTypes} from "./redux-store";


export type DialogsPageType = {
    messages: MessagesType[]
    dialogs: DialogsType[]
    newMessageBody: string
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
    newMessageBody: '',
}

export const dialogsReducer = (state = initialState, action: ActionsTypes): DialogsPageType => {
    switch (action.type) {
        case "ADD-MESSAGE":
            let newMessage: MessagesType = {
                id: new Date().getTime(),
                message: action.textMessage
            }
            return {
                ...state,
                messages: [...state.messages, newMessage],
                newMessageBody: ''
            }

        case "UPDATE-NEW-MESSAGE-BODY":
            return {
                ...state,
                newMessageBody: action.body
            }
        default:
            return {
                ...state
            }
    }

}



