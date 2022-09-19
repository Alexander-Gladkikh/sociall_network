import {ActionsTypes} from "./redux-store";

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
    users: [
        {
            id: 1,
            fullName: 'Dmitry',
            followed: false,
            status: 'I am a boss',
            location: {city: 'Minsk', country: 'Belarus'}
        },
        {
            id: 2,
            fullName: 'Sasha',
            followed: true,
            status: 'I am a boss too',
            location: {city: 'Moscow', country: 'Russia'}
        },
        {
            id: 3,
            fullName: 'Andrey',
            followed: false,
            status: 'I am a boss too',
            location: {city: 'Kiev', country: 'Ukraine'}
        },
    ]
}

export const usersReducer = (state: UsersPageType = initialState, action: ActionsTypes): UsersPageType => {
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




