import React from "react";
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogsItem/DialogsItem";
import {Message} from "./Messages/Messages";
import {DialogsType, InitialState, MessagesType} from "../../redux/dialogs-reducer";
import {InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {createField, Textarea} from "../common/FormsControls/FormsControls";


type Props = {
    dialogsPage: InitialState
    sendMessage: (messageText: string) => void
}

type NewMessageFormValuesType = {
    newMessageBody: string
}

type DialogsFormValuesTypeKeys = Extract<keyof NewMessageFormValuesType, string>


export const Dialogs: React.FC<Props> = (props) => {

    const state = props.dialogsPage

    let dialogsElement = state.dialogs.map((m: DialogsType) =>
        <DialogItem key={m.id} name={m.name}
                    id={m.id}/>)

    let messagesElement = state.messages.map((m: MessagesType) =>
        <Message key={m.id}
                 message={m.message}
                 id={m.id}/>)

    const addNewMessage = (values: { newMessageBody: string }) => {
        props.sendMessage(values.newMessageBody)
    }


    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                {dialogsElement}
            </div>

            <div className={s.messages}>
                {messagesElement}
            </div>
            <AddMessageFormRedux onSubmit={addNewMessage}/>
        </div>
    )
}

const maxLength50 = maxLengthCreator(50)
type PropsAddMessageType = {}
const AddMessageForm:React.FC<InjectedFormProps<NewMessageFormValuesType, PropsAddMessageType> & PropsAddMessageType>  = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<DialogsFormValuesTypeKeys>('Enter your message', 'newMessageBody', [required, maxLength50], Textarea)}
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}


const AddMessageFormRedux = reduxForm<NewMessageFormValuesType>({form: 'dialogsAddMessageBody'})(AddMessageForm)