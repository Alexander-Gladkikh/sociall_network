import {Navigate} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";

const mapStateToPropsForRedirect = (state: AppStateType)  => {
    return {
        isAuth: state.auth.isAuth
    }
}

export const widthAuthRedirect = (Component: any) => {
    debugger

    class RedirectComponent extends React.Component {
        render() {
            // @ts-ignore
            if(!this.props.isAuth) return <Navigate to='/login'/>
            return <Component {...this.props}/>

        }
    }
    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)
    return RedirectComponent
}

