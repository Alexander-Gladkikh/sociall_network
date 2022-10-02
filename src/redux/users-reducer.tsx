import {ActionsTypes} from "./redux-store";

export type UserType = {
    id: number
    followed: boolean
    fullName: string
    status: string
    location: UsersLocationType
}

export type UsersLocationType = {
    city: string
    country: string
}

let initialState: initialStateType = {
    users: []
}

export type initialStateType = {
    users: UserType[]
}

export const usersReducer = (state: initialStateType  = initialState, action: ActionsTypes): initialStateType => {
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




