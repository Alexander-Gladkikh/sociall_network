export type UsersPageType = {
    users: UsersType[]
}

export type UsersType = {
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


let initialState: UsersPageType = {
    users: []
}

export const usersReducer = (state = initialState, action: userReducerActionType): UsersPageType => {
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
                users: [...state.users, action.users]
            }
        default:
            return {
                ...state
            }
    }

}

export type userReducerActionType =
    ReturnType<typeof followAC>
    | ReturnType<typeof unfollowAC>
    | ReturnType<typeof setUsersAC>

export const followAC = (userId: number) => ({type: 'FOLLOW', userId} as const)
export const unfollowAC = (userId: number) => ({type: 'UNFOLLOW', userId} as const)
export const setUsersAC = (users: any) => ({type: 'SET_USERS', users} as const)




