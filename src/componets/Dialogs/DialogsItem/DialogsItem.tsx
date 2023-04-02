import React from "react";
import s from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";

type PropsType = {
    id: string
    name: string
}
export const DialogItem: React.FC<PropsType> = (props) => {
    return (
        <div className={s.dialog}>
            <NavLink to={'/dialogs/' + props.id}>{props.name}</NavLink></div>
    )
}
