import React from "react";
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogsItem/DialogsItem";
import {Message} from "./Messages/Messages";
import {DialogsPageType, DialogsType, MessagesType} from "../../store";
import {AddMessage} from "./AddMessage/AddMessage";

type dialogsPropsType = {
    store: any
}


export const Dialogs: React.FC<dialogsPropsType> = (props) => {

    let dialogsElement = props.store._state.dialogsPage.dialogs.map((m: DialogsType) => <DialogItem name={m.name} id={m.id} />)

     let messagesElement = props.store._state.dialogsPage.messages.map( (m: MessagesType) => <Message message={m.message}/>)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                {dialogsElement}
            </div>

            <div className={s.messages}>
                {messagesElement}
            </div>
            <AddMessage/>

        </div>
    )
}

