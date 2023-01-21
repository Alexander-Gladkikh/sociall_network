import React from "react";
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogsItem/DialogsItem";
import {Message} from "./Messages/Messages";
import {DialogsType, MessagesType} from "../../redux/dialogs-reducer";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {Textarea} from "../common/FormsControls/FormsControls";

type dialogsPropsType = {
    dialogs: DialogsType[]
    messages: MessagesType[]
    addMessage: (text: string) => void
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

    const addNewMessage = (values: any) => {
        props.addMessage(values.newMessageBody)
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

const AddMessageForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    component={Textarea}
                    name='newMessageBody'
                    validate={[required, maxLength50]}
                    placeholder='Enter your message'/>
            </div>
            <div>
                <button>Add Message</button>
            </div>
        </form>
    )
}


const AddMessageFormRedux = reduxForm({form: 'dialogsAddMessageBody'})(AddMessageForm)