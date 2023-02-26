import {InferActionsType} from "./redux-store";

export type DialogsType = {
    id: string
    name: string
}
export type MessagesType = {
    id: number
    message: string
}

const initialState = {
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How is your it-kamasutra'},
        {id: 3, message: 'Yo'},
    ] as Array<MessagesType>,
    dialogs: [
        {id: '1', name: 'Dimych'},
        {id: '2', name: 'Andrey'},
        {id: '3', name: 'Sveta'},
        {id: '4', name: 'Sasha'},
        {id: '5', name: 'Victor'},
        {id: '6', name: 'Valera'},
    ] as Array<DialogsType>,

}

export const dialogsReducer = (state = initialState, action: ActionsType): InitialState => {
    switch (action.type) {
        case "SN/DIALOGS/SEND-MESSAGE":
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

export const actions = {
    sendMessage:  (newMessageBody: string) => {
        return {
            type: "SN/DIALOGS/SEND-MESSAGE",
            newMessageBody
        } as const
    }
}

export type InitialState = typeof initialState
type ActionsType = InferActionsType<typeof actions>




