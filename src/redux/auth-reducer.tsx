import {ActionsTypes} from "./redux-store";

export type initialStateType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    isFetching: boolean
}

let initialState: initialStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: false
}

export const authReducer = (state: initialStateType = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case "SET-USER-DATA":

            return {
                ...state,
                ...action.data, isAuth: true
            }
        default:
            return {
                ...state
            }
    }

}

export const setAuthUserData = (id: number, email: string, login: string) => {
    return {
        type: 'SET-USER-DATA',
        data: {id, email, login}
    } as const
}




