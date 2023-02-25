import {UsersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/objects-helpers";
import {UserType} from "../types/types";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_USER_COUNT = 'SET-TOTAL-USER-COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS'

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 500, // нужно 0
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>
}

type InitialStateType = typeof initialState
export const usersReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            }
        case "UNFOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            }
        case "SET-USERS":
            return {
                ...state,
                users: [...action.users]
            }
        case "SET-CURRENT-PAGE":
            return {...state, currentPage: action.currentPage}
        case "SET-TOTAL-USER-COUNT":
            return {...state, totalUsersCount: action.count}
        case "TOGGLE-IS-FETCHING":
            return {...state, isFetching: action.isFetching}
        case "TOGGLE-IS-FOLLOWING-PROGRESS":
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter((id: number) => id != action.userId)
            }
        default:
            return {
                ...state
            }
    }

}

type ActionsTypes = FollowSuccessActionType | UnfollowSuccessActionType | SetUsersActionType |
    SetCurrentPageActionType | SetTotalUserCountActionType | ToggleFollowingProgressActionType |
    ToggleIsFetchingActionType

type FollowSuccessActionType = {
    type: typeof FOLLOW
    userId: number
}
export const followSuccess = (userId: number): FollowSuccessActionType => {
    return {
        type: 'FOLLOW',
        userId
    } as const
}

type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => {
    return {
        type: 'UNFOLLOW',
        userId
    } as const
}

type SetUsersActionType = {
    type: typeof SET_USERS
    users: UserType[]
}
export const setUsers = (users: UserType[]): SetUsersActionType => {
    return {
        type: 'SET-USERS',
        users
    } as const
}

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => {
    return {
        type: 'SET-CURRENT-PAGE',
        currentPage
    } as const
}

type SetTotalUserCountActionType = {
    type: typeof SET_TOTAL_USER_COUNT
    count: number
}
export const setTotalUserCount = (count: number): SetTotalUserCountActionType => {
    return {
        type: 'SET-TOTAL-USER-COUNT',
        count
    } as const
}

type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => {
    return {
        type: 'TOGGLE-IS-FETCHING',
        isFetching
    } as const
}

type ToggleFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressActionType => {
    return {
        type: 'TOGGLE-IS-FOLLOWING-PROGRESS',
        isFetching, userId
    } as const
}

type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>

export const requestUsers = (page: number, pageSize: number): ThunkType => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page))

        const data = await UsersAPI.getUsers(page, pageSize)
        dispatch(setUsers(data.items))
        dispatch(toggleIsFetching(false))
    }
}

const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any, action: (userId: number) => FollowSuccessActionType |
    UnfollowSuccessActionType) => {
    dispatch(toggleFollowingProgress(true, userId));
    const data = await apiMethod(userId)
    if (data.resultCode == 0) {
        dispatch(action(userId))
    }
    dispatch(toggleFollowingProgress(false, userId));
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        const apiMethod = UsersAPI.follow.bind(userId)
        await _followUnfollowFlow(dispatch, userId, apiMethod, followSuccess)

    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        let apiMethod = UsersAPI.unfollow.bind(userId)
        await _followUnfollowFlow(dispatch, userId, apiMethod, unfollowSuccess)
    }
}






