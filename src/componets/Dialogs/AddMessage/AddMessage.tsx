import React, {ChangeEvent} from "react";
import {ActionsTypes, addMessageAC, RootStateType, updateNewMessageBodyAC} from "../../../redux/state";

type PropsType = {
    message: string
    dispatch:(action: ActionsTypes) => void
}

export const AddMessage: React.FC<PropsType> = (props ) => {

    const addMessage = () => {
        props.dispatch(addMessageAC(props.message))
    }

    const changeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch(updateNewMessageBodyAC(e.currentTarget.value))
    }
    return (
        <div>
            <textarea value={props.message} onChange={changeMessage}></textarea>
            <button onClick={addMessage}>Add Message</button>
        </div>

    )
}