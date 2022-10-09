import React from "react";
import {Header} from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {setAuthUserData} from "../../redux/auth-reducer";
import {AuthMeAPI} from "../../api/api";

class HeaderContainer extends React.Component<any, any>{

    componentDidMount() {
        AuthMeAPI.login().then(data => {
            if(data.resultCode === 0) {
                const {id, email, login} = data.data;
                this.props.setAuthUserData(id, email, login);
            }
        })
    }

    render () {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state: any) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});

export default connect(mapStateToProps, {setAuthUserData}) (HeaderContainer);