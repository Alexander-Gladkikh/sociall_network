import React from "react";
import {connect} from "react-redux";
import {followAC, initialStateType, setUsersAC, unfollowAC, UserType} from "../../redux/users-reducer";
import Users from "./Users";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";


type MapStatePropsType = {
    usersPage: initialStateType
}

type MapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: UserType[]) => void
}

export type UsersPropsType = MapStatePropsType & MapDispatchPropsType;

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        usersPage: state.users
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        follow: (userId: number) => dispatch(followAC(userId)) ,
        unfollow: (userId: number) => dispatch(unfollowAC(userId)) ,
        setUsers: (users: UserType[]) => dispatch(setUsersAC(users))
    }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)

export default UsersContainer
