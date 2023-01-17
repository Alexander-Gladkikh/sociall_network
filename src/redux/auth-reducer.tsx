import {ActionsTypes} from "./redux-store";
import {UsersAPI} from "../api/api";

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
                ...action.data, isAuth: true
            }
        default:
            return {
                ...state
            }
    }

}

export const setAuthUserData = (id: number, login: string, email: string) => {
    return {
        type: 'SET-USER-DATA',
        data: {id, login, email}
    } as const
}

export const getAuthUser = () => {

    return (dispatch: any) => {
        UsersAPI.login().then(data => {

            if (data.resultCode === 0) {
                let {id, login, email} = data.data;
                dispatch(setAuthUserData(id, login, email));
            }

        })
    }
}




