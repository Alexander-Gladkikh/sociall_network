import {updateObjectInArray} from "../utils/objects-helpers";
import {UserType} from "../types/types";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsType} from "./redux-store";
import {usersAPI} from "../api/usersAPI";

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

type ActionsTypes = InferActionsType<typeof actions>

export const actions = {
    followSuccess: (userId: number) => {
        return {
            type: 'FOLLOW',
            userId
        } as const
    },
    unfollowSuccess: (userId: number) => {
        return {
            type: 'UNFOLLOW',
            userId
        } as const
    },
    setUsers: (users: UserType[]) => {
        return {
            type: 'SET-USERS',
            users
        } as const
    },
    setCurrentPage: (currentPage: number) => {
        return {
            type: 'SET-CURRENT-PAGE',
            currentPage
        } as const
    },
    setTotalUserCount: (count: number) => {
        return {
            type: 'SET-TOTAL-USER-COUNT',
            count
        } as const
    },
    toggleIsFetching: (isFetching: boolean) => {
        return {
            type: 'TOGGLE-IS-FETCHING',
            isFetching
        } as const
    },
    toggleFollowingProgress: (isFetching: boolean, userId: number) => {
        return {
            type: 'TOGGLE-IS-FOLLOWING-PROGRESS',
            isFetching, userId
        } as const
    }
}

type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>

export const requestUsers = (page: number, pageSize: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(page))

        const data = await usersAPI.getUsers(page, pageSize)
        dispatch(actions.setUsers(data.items))
        dispatch(actions.toggleIsFetching(false))
    }
}

const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any, action: (userId: number) => ActionsTypes) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    const data = await apiMethod(userId)
    if (data.resultCode == 0) {
        dispatch(action(userId))
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        const apiMethod = usersAPI.follow.bind(userId)
        await _followUnfollowFlow(dispatch, userId, apiMethod, actions.followSuccess)

    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        let apiMethod = usersAPI.unfollow.bind(userId)
        await _followUnfollowFlow(dispatch, userId, apiMethod, actions.unfollowSuccess)
    }
}






