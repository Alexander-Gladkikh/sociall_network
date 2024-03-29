import {createSelector} from "reselect";
import {RootState} from "./redux-store";

const getUsersSelector = (state: RootState) => {
    return state.users.users
}

export const getUsers = createSelector(getUsersSelector, (users) => {
    return users
})



export const getPageSize = (state: RootState) => {
    return state.users.pageSize
}
export const getTotalUsersCount = (state: RootState) => {
    return state.users.totalUsersCount
}
export const getCurrentPage = (state: RootState) => {
    return state.users.currentPage
}
export const getIsFetching = (state: RootState) => {
    return state.users.isFetching
}
export const getFollowingInProgress = (state: RootState) => {
    return state.users.followingInProgress
}
export const getFilterSearch = (state: RootState) => {
    return state.users.filter
}
