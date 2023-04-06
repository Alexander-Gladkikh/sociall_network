import React from 'react';
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeys, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";
import style from '../common/FormsControls/FormsControls.module.css'
import {RootState} from "../../redux/redux-store";

type LoginFormOwnProps = {
    captchaUrl: string | null
}

export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>

const LoginForm:
    React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({
                                                                                                   handleSubmit,
                                                                                                   error,
                                                                                                   captchaUrl
                                                                                               }) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<LoginFormValuesTypeKeys>('Email', 'email', [required], Input, {type: 'text'})}
            {createField<LoginFormValuesTypeKeys>('Password', 'password', [required], Input, {type: 'password'})}
            {createField<LoginFormValuesTypeKeys>('', 'rememberMe', [], Input, {type: 'checkbox'})}

            {captchaUrl && <img src={captchaUrl}/>}
            { captchaUrl && createField<LoginFormValuesTypeKeys>('Symbols from image', 'captcha', [required], Input, {})}

            {error && <div className={style.formSummaryError}>
                {error}
            </div>}

            <button>Login</button>
        </form>
    );
};



type MapStateToPropsType = {
    captchaUrl: string | null
    isAuth: boolean
}
type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm)

const Login: React.FC<MapStateToPropsType & MapDispatchToPropsType> = (props) => {
    const onSubmit = (formData: LoginFormValuesType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Navigate to={'/profile'}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    );
};

const mapStateToProps = (state: RootState): MapStateToPropsType => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login);