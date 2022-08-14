import {ActionsTypes, DialogsPageType, MessagesType,} from "../App";

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

export const dialogsReducer = (state = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case "ADD-MESSAGE":
            let newMessage: MessagesType = {
                id: new Date().getTime(),
                message: action.textMessage
            }
            state.messages.push(newMessage);
            state.newMessageBody = '';
            return state

        case "UPDATE-NEW-MESSAGE-BODY":
            state.newMessageBody = action.body;
            return state
        default:
            return state
    }
}



