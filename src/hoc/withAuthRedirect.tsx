import {Navigate} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";
import {RootState} from "../redux/redux-store";

const mapStateToPropsForRedirect = (state: RootState)  => {
    return {
        isAuth: state.auth.isAuth
    }
}

type MapPropsType = {
    isAuth: boolean
}

type DispatchPropsType ={}

export function widthAuthRedirect <WCP>(WrappedComponent: React.ComponentType<WCP>) {

    const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {
        let {isAuth, ...restProps} = props
        if (!isAuth) return <Navigate to='/login'/>

        return <WrappedComponent {...restProps as WCP}/>

    }

    let ConnectedAuthRedirectComponent = connect<MapPropsType, {}, WCP, RootState>
    (mapStateToPropsForRedirect)(RedirectComponent)
    return RedirectComponent
}

