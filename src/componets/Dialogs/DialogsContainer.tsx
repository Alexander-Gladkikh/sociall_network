import React from "react";

import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {sendMessageCreator, AppStateType} from "../../redux/redux-store";
import {DialogsPageType} from "../../redux/dialogs-reducer";
import {compose} from "redux";



const mapStateToProps = (state:  AppStateType): DialogsPageType => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        isAuth: state.auth.isAuth
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        addMessage: (newMessageBody: string) => dispatch(addMessageAC(newMessageBody)),
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(compose(
)(Dialogs))

export default DialogsContainer

