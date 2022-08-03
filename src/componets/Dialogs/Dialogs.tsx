import React from "react";
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogsItem/DialogsItem";
import {Message} from "./Messages/Messages";
import {DialogsPageType, DialogsType, MessagesType} from "../../redux/state";

type dialogsPropsType = {
    dialogsPage: DialogsPageType
}


export const Dialogs: React.FC<dialogsPropsType> = (props) => {

    let dialogsElement = props.dialogsPage.dialogs.map((m: DialogsType) => <DialogItem name={m.name} id={m.id} />)

     let messagesElement = props.dialogsPage.messages.map( (m: MessagesType) => <Message message={m.message}/>)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>

                {dialogsElement}

            </div>
            <div className={s.messages}>
                {messagesElement}

            </div>
        </div>
    )
}