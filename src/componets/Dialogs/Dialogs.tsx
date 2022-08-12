import React from "react";
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogsItem/DialogsItem";
import {Message} from "./Messages/Messages";
import {ActionsTypes, DialogsType, MessagesType, RootStateType} from "../../redux/state";
import {AddMessage} from "./AddMessage/AddMessage";

type dialogsPropsType = {
    state: RootStateType
    dispatch:(action: ActionsTypes) => void
}


export const Dialogs: React.FC<dialogsPropsType> = (props) => {

    let dialogsElement = props.state.dialogsPage.dialogs.map((m: DialogsType) => <DialogItem key={m.id} name={m.name} id={m.id}/>)

    let messagesElement = props.state.dialogsPage.messages.map((m: MessagesType) => <Message key={m.id} message={m.message} id={m.id}/>)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                {dialogsElement}
            </div>

            <div className={s.messages}>
                {messagesElement}
            </div>
            <AddMessage message={props.state.dialogsPage.newMessageBody} dispatch={props.dispatch}/>

        </div>
    )
}

