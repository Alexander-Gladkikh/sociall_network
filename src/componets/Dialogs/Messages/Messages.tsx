import React from "react";
import s from './../Dialogs.module.css'
import {MessagesType} from "../../../redux/dialogs-reducer";




export const Message: React.FC<MessagesType> = (props) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
}


