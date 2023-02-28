import React from "react";
import s from './Header.module.css';
import {NavLink} from "react-router-dom";

export type MapPropsType = {
    isAuth: boolean
    login: string | null
}
export type DispatchPropsType = {
    logout: () => void
}

export const Header: React.FC<MapPropsType & DispatchPropsType> = (props) => {
    return (
        <header className={s.header}>
            <img className={s.logo}
                 src={'https://mllj2j8xvfl0.i.optimole.com/Lsv2lkg.cHDL~36fa1/w:auto/h:auto/q:98/https://s15165.pcdn.co/wp-content/uploads/2021/04/LEGO-Logo.png'}/>
            
            <div className={s.loginBlock}>
                { props.isAuth
                    ? <div>{props.login } - <button onClick={props.logout}>Log out</button></div>
                    :<NavLink to={'/login'}>Login</NavLink>}

            </div>
        </header>
    )
}