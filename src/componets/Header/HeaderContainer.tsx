import React from "react";
import {DispatchPropsType, Header, MapPropsType} from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";
import {RootState} from "../../redux/redux-store";



class HeaderContainer extends React.Component<MapPropsType & DispatchPropsType>{

    render () {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state: RootState) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
})

export default connect<MapPropsType, DispatchPropsType, {}, RootState>(mapStateToProps, {logout}) (HeaderContainer);