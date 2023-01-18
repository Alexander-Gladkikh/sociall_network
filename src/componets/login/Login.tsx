import React from 'react';
import {Field, reduxForm} from "redux-form";

const LoginForm: React.FC = (props) => {
    return (
        <form>
            <div>
                <Field placeholder={'Login'} component={'input'} name={'login'}/>
            </div>
            <div>
                <Field placeholder={'Password'} component={'input'} name={'password'}/>
            </div>
            <div>
                <Field type={"checkbox"} component={'input'} name={'remember me'}/>remember me
            </div>
            <button>Login</button>
        </form>
    );
};

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login: React.FC = () => {
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm/>
        </div>
    );
};

export default Login;