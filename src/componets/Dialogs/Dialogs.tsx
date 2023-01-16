import React, {ChangeEvent} from "react";
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogsItem/DialogsItem";
import {Message} from "./Messages/Messages";
import {DialogsType, MessagesType} from "../../redux/dialogs-reducer";

type dialogsPropsType = {
    dialogs: DialogsType[]
    messages: MessagesType[]
    newMessageBody: string
    addMessage: (text: string) => void
    changeMessage: (text: string) => void
    isAuth?: boolean
}


export const Dialogs: React.FC<dialogsPropsType> = (props) => {

    let dialogsElement = props.dialogs.map((m: DialogsType) =>
        <DialogItem key={m.id} name={m.name}
                    id={m.id}/>)

    let messagesElement = props.messages.map((m: MessagesType) =>
        <Message key={m.id}
                 message={m.message}
                 id={m.id}/>)

    const addMessage = () => {
        props.addMessage(props.newMessageBody)
    }

    const changeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.changeMessage(e.currentTarget.value)
    }

    alert(props.isAuth)


    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                {dialogsElement}
            </div>

            <div className={s.messages}>
                {messagesElement}
            </div>
            <div>
                <textarea value={props.newMessageBody} onChange={changeMessage}></textarea>
                <button onClick={addMessage}>Add Message</button>
            </div>

        </div>
    )
}

