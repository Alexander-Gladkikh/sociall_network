import React from "react";
import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";
import Friends from "../Friends/Friends";
import {RootStateType} from "../../redux/state";

type NavbarPropsType = {
    state: RootStateType
}

export const Navbar:React.FC<NavbarPropsType> = (props) => {
    return (
        <nav className={s.navigation}>
            {props.state.navBarPage.titlePage.map((el: any) => {
                return (
                    <div key={el.id}>
                        <NavLink to={el.link} className={navData => navData.isActive ? s.active : s.item}>{el.title}</NavLink>
                    </div>
                )
            })}
            <Friends friendsState={props.state.navBarPage.friends}/>
        </nav>
    )
}