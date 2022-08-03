import React from "react";
import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";
import {FriendsPageType, NavBarPageType} from "../../redux/state";
import Friends from "../Friends/Friends";

type NavbarPropsType = {
    navBarState: NavBarPageType
    friendsState: FriendsPageType
}

export const Navbar:React.FC<NavbarPropsType> = (props) => {
    return (
        <nav className={s.navigation}>
            {props.navBarState.titlePage.map(el => {
                return (
                    <div>
                        <NavLink to={el.link} className={navData => navData.isActive ? s.active : s.item}>{el.title}</NavLink>
                    </div>
                )
            })}
            <Friends friendsState={props.friendsState}/>
        </nav>
    )
}