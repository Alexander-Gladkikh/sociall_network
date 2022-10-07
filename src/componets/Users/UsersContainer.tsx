import React from "react";
import {connect} from "react-redux";
import {
    follow,
    initialStateType,
    setCurrentPage, setTotalUserCount,
    setUsers, toggleIsFetching,
    unfollow,
    UserType
} from "../../redux/users-reducer";
import {AppStateType} from "../../redux/redux-store";
import axios from "axios";
import {Users} from "./Users";
import {Preloader} from "../common/preloader/Preloader";

type MapStatePropsType = {
    usersPage: initialStateType
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
}
type MapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: UserType[]) => void
    setCurrentPage: (currentPage: number) => void
    setTotalUserCount: (count: number) => void
    toggleIsFetching: (isFetching: boolean) => void
}
export type UsersPropsType = MapStatePropsType & MapDispatchPropsType;


class UsersContainer extends React.Component<UsersPropsType> {
    componentDidMount() {
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items)
            //this.props.setTotalUserCount(response.data.totalCount)
            this.props.toggleIsFetching(false)
        })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items)
            this.props.toggleIsFetching(false)
        })
    }

    render() {
        return <div>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   usersPage={this.props.usersPage}
                   unfollow={this.props.unfollow}
                   follow={this.props.follow}
            />
        </div>
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        usersPage: state.users,
        pageSize: state.users.pageSize,
        totalUsersCount: state.users.totalUsersCount,
        currentPage: state.users.currentPage,
        isFetching: state.users.isFetching
    }
}

// const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
//     return {
//         follow: (userId: number) => dispatch(follow(userId)),
//         unfollow: (userId: number) => dispatch(unfollow(userId)),
//         setUsers: (users: UserType[]) => dispatch(setUsers(users)),
//         setCurrentPage: (currentPage: number) => dispatch(setCurrentPage(currentPage)),
//         setTotalUserCount: (count: number) => dispatch(setTotalUserCount(count)),
//         toggleIsFetching: (isFetching: boolean) => dispatch(toggleIsFetching(isFetching))
//     }
// }

export default connect(mapStateToProps,
    {follow, unfollow, setUsers, setCurrentPage, setTotalUserCount, toggleIsFetching})(UsersContainer)


