import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Navbar} from "./Navbar";


const MapStateToProps = (state: AppStateType) => {
    return {
        friends: state.navBarPage.friends,
        titlePage: state.navBarPage.titlePage
    }
}

const MapDispatchToProps = (dispatch: any) => {
    return {}
}

const NavbarContainer = connect(MapStateToProps, MapDispatchToProps)(Navbar)

export default NavbarContainer