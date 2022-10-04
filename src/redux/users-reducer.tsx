import {ActionsTypes} from "./redux-store";

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
}

let initialState: initialStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 50, // нужно 0
    currentPage: 2,
    isFetching: false
}

export const usersReducer = (state: initialStateType = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : u)
            }
        case "UNFOLLOW":
            return {
                ...state,
                users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u)
            }
        case "SET_USERS":
            return {
                ...state,
                users: [...action.users]
            }
        case "SET_CURRENT_PAGE":
            return { ...state, currentPage: action.currentPage}
        case "SET_TOTAL_USER_COUNT":
            return { ...state, totalUsersCount: action.count}
        case "TOGGLE_IS_FETCHING":
            return { ...state, isFetching: action.isFetching}
        default:
            return {
                ...state
            }
    }

}

export const followAC = (userId: number) => {
    return {
        type: 'FOLLOW',
        userId
    } as const
}
export const unfollowAC = (userId: number) => {
    return {
        type: 'UNFOLLOW',
        userId
    } as const
}
export const setUsersAC = (users: UserType[]) => {
    return {
        type: 'SET_USERS',
        users
    } as const
}
export const setCurrentPageAC = (currentPage: number) => {
    return {
        type: 'SET_CURRENT_PAGE',
        currentPage
    } as const
}
export const setTotalUserCountAC = (count: number) => {
    return {
        type: 'SET_TOTAL_USER_COUNT',
        count
    } as const
}
export const toggleIsFetchingAC = (isFetching: boolean) => {
    return {
        type: 'TOGGLE_IS_FETCHING',
        isFetching
    } as const
}




