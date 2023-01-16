import React from "react";
import {Header} from "./Header";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";



class HeaderContainer extends React.Component<any, any>{

    componentDidMount() {
        this.props.login()

    }
    render () {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state: any) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});

export default connect(mapStateToProps, {login}) (HeaderContainer);