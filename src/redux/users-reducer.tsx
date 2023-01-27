import {ActionsTypes} from "./redux-store";
import {UsersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/objects-helpers";


export type UserType = {
    id: number
    followed: boolean
    name: string
    status: string
    photos: {
        "small": string,
        "large": string
    }
    location: UsersLocationType
}

export type UsersLocationType = {
    city: string
    country: string
}

export type initialStateType = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: any
}

let initialState: initialStateType = {
    users: [],
    pageSize: 20,
    totalUsersCount: 500, // нужно 0
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}

export const usersReducer = (state: initialStateType = initialState, action: ActionsTypes): initialStateType => {
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
        case "SET_USERS":
            return {
                ...state,
                users: [...action.users]
            }
        case "SET_CURRENT_PAGE":
            return {...state, currentPage: action.currentPage}
        case "SET_TOTAL_USER_COUNT":
            return {...state, totalUsersCount: action.count}
        case "TOGGLE_IS_FETCHING":
            return {...state, isFetching: action.isFetching}
        case "TOGGLE_IS_FOLLOWING_PROGRESS":
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

export const followSuccess = (userId: number) => {
    return {
        type: 'FOLLOW',
        userId
    } as const
}
export const unfollowSuccess = (userId: number) => {
    return {
        type: 'UNFOLLOW',
        userId
    } as const
}
export const setUsers = (users: UserType[]) => {
    return {
        type: 'SET_USERS',
        users
    } as const
}
export const setCurrentPage = (currentPage: number) => {
    return {
        type: 'SET_CURRENT_PAGE',
        currentPage
    } as const
}
export const setTotalUserCount = (count: number) => {
    return {
        type: 'SET_TOTAL_USER_COUNT',
        count
    } as const
}
export const toggleIsFetching = (isFetching: boolean) => {
    return {
        type: 'TOGGLE_IS_FETCHING',
        isFetching
    } as const
}

export const toggleFollowingProgress = (isFetching: boolean, userId: number) => {
    return {
        type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
        isFetching, userId
    } as const
}

export const requestUsers = (page: any, pageSize: any) => {
    return async (dispatch: any) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page))

        const data = await UsersAPI.getUsers(page, pageSize)
        dispatch(setUsers(data.items))
        dispatch(toggleIsFetching(false))
    }
}

const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, action: any) => {
    dispatch(toggleFollowingProgress(true, userId));
    const data = await apiMethod(userId)
    if (data.resultCode == 0) {
        dispatch(action(userId))
    }
    dispatch(toggleFollowingProgress(false, userId));
}

export const follow = (userId: number) => {
    return async (dispatch: any) => {
        const apiMethod = UsersAPI.follow.bind(userId)
        await followUnfollowFlow(dispatch, userId, apiMethod, followSuccess)

    }
}

export const unfollow = (userId: number) => {
    return async (dispatch: any) => {
        let apiMethod = UsersAPI.unfollow.bind(userId)
        await followUnfollowFlow(dispatch, userId, apiMethod, unfollowSuccess)
    }
}






