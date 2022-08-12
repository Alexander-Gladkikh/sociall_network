import {ActionsTypes, DialogsPageType,MessagesType,} from "./state";

export const dialogsReducer = (state: DialogsPageType, action: ActionsTypes) => {
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



