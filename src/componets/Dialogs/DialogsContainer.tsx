import React from "react";

import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {actions, DialogsType, MessagesType} from "../../redux/dialogs-reducer";
import {compose} from "redux";

type MapStateToPropsType = {
    dialogs: DialogsType[]
    messages: MessagesType[]
    isAuth?: any
}

const mapStateToProps = (state:  AppStateType): MapStateToPropsType => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        addMessage: (newMessageBody: string) => dispatch(actions.sendMessageCreator(newMessageBody)),
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(compose(
)(Dialogs))

export default DialogsContainer

