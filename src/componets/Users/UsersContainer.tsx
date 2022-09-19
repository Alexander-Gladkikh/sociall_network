import React from "react";
import {connect} from "react-redux";
import {UsersPageType, UsersType} from "../../redux/users-reducer";
import Users from "./Users";
import {AppStateType, followAC, setUsersAC, unfollowAC} from "../../redux/redux-store";

const mapStateToProps = (state: AppStateType): UsersPageType => {
    return {
        users: state.userPage.users
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        follow: (userId: number) => dispatch(followAC(userId)) ,
        unfollow: (userId: number) => dispatch(unfollowAC(userId)) ,
        setUsers: (users: UsersType) => dispatch(setUsersAC(users))
    }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)

export default UsersContainer
