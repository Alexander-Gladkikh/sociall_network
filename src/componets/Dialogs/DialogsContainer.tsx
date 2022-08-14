import React from "react";
import {addMessageAC, StoreType, updateNewMessageBodyAC} from "../../App";
import {Dialogs} from "./Dialogs";

type dialogsContainerPropsType = {
    store: StoreType
}


export const DialogsContainer: React.FC<dialogsContainerPropsType> = (props) => {
    let state = props.store.getState();

    const addMessage = (text: string) => {
        props.store.dispatch(addMessageAC(text))
    }

    const changeMessage = (text: string) => {
        props.store.dispatch(updateNewMessageBodyAC(text))
    }

    return (
        <div>
            <Dialogs dialogs={state.dialogsPage.dialogs}
                     messages={state.dialogsPage.messages}
                     addMessage={addMessage}
                     changeMessage={changeMessage} newMessageBody={state.dialogsPage.newMessageBody}/>
        </div>
    )
}


