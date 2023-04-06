import React from "react";
import {connect} from "react-redux";
import {RootState} from "../../redux/redux-store";
import {Navbar} from "./Navbar";


const MapStateToProps = (state: RootState) => {
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