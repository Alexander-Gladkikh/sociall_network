import React from "react";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {actions} from "../../redux/dialogs-reducer";
import {compose} from "redux";
import {widthAuthRedirect} from "../../hoc/withAuthRedirect";


const mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps,
        {sendMessage: actions.sendMessage}),
    widthAuthRedirect)(Dialogs);




