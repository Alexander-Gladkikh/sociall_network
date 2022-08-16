import React from "react";
import {NavBarPageType} from "../../App";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Navbar} from "./Navbar";

const MapStateToProps = (state: AppStateType): NavBarPageType => {
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