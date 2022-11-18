import React from "react";

import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {addMessageAC, AppStateType, updateNewMessageBodyAC} from "../../redux/redux-store";
import {DialogsPageType} from "../../redux/dialogs-reducer";



const mapStateToProps = (state:  AppStateType): DialogsPageType => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        newMessageBody: state.dialogsPage.newMessageBody,
        isAuth: state.auth.isAuth
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        addMessage: (text: string) => dispatch(addMessageAC(text)),
        changeMessage: (message: string) => dispatch(updateNewMessageBodyAC(message))

    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer

