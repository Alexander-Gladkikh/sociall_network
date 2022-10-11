import React from "react";
import {connect} from "react-redux";
import {
    follow,
    followSuccess, getUsers,
    initialStateType,
    setCurrentPage,
    toggleFollowingProgress, unfollow,
    unfollowSuccess,
} from "../../redux/users-reducer";
import {AppStateType} from "../../redux/redux-store";
import {Users} from "./Users";
import {Preloader} from "../common/preloader/Preloader";


type MapStatePropsType = {
    usersPage: initialStateType
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: []
}
type MapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    //setUsers: (users: UserType[]) => void
    setCurrentPage: (currentPage: number) => void
    //setTotalUserCount: (count: number) => void
    //toggleIsFetching: (isFetching: boolean) => void
    //toggleFollowingProgress: (isFetching: boolean, userId: number) => void
    getUsers: any
}
export type UsersPropsType = MapStatePropsType & MapDispatchPropsType;


class UsersContainer extends React.Component<UsersPropsType> {
    componentDidMount() {
        // this.props.toggleIsFetching(true)
        // UsersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
        //     this.props.setUsers(data.items)
        //     //this.props.setTotalUserCount(response.data.totalCount)
        //     this.props.toggleIsFetching(false)
        // })

        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {

        this.props.getUsers(pageNumber, this.props.pageSize)

        // this.props.setCurrentPage(pageNumber)
        // this.props.toggleIsFetching(true)
        // UsersAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
        //     this.props.setUsers(data.items)
        //     this.props.toggleIsFetching(false)
        // })
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
                   followingInProgress={this.props.followingInProgress}
                   //toggleFollowingProgress={this.props.toggleFollowingProgress}
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
        isFetching: state.users.isFetching,
        followingInProgress: state.users.followingInProgress
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
    {follow, unfollow,  setCurrentPage,
          toggleFollowingProgress,
        getUsers,})(UsersContainer)


