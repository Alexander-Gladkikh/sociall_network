import {ActionsTypes} from "./redux-store";
import {authAPI, UsersAPI} from "../api/api";
import {stopSubmit} from "redux-form";

export type initialStateType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

let initialState: initialStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
}

export const authReducer = (state: initialStateType = initialState, action: ActionsTypes): initialStateType => {

    switch (action.type) {

        case "SET-USER-DATA":

            return {
                ...state,
                ...action.payload
            }
        default:
            return {
                ...state
            }
    }

}

export const setAuthUserData = (id: number | null, login: string | null, email: string | null, isAuth: boolean) => {
    return {
        type: 'SET-USER-DATA',
        payload: {id, login, email, isAuth}
    } as const
}

export const getAuthUser = () => (dispatch: any) => {
    return authAPI.me().then(data => {
        if (data.resultCode === 0) {
            let {id, login, email} = data.data;
            dispatch(setAuthUserData(id, login, email, true));
        }
    })

}

export const login = (email: any, password: any, rememberMe: any) => (dispatch: any) => {


    authAPI.login(email, password, rememberMe)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getAuthUser())
            } else {
                let messages = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
                dispatch(stopSubmit('login', {_error: messages}))
            }

        })
}

export const logout = () => (dispatch: any) => {
    authAPI.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }

        })
}





