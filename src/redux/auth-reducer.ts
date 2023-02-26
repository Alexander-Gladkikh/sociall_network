import {ActionsTypes} from "./redux-store";
import {stopSubmit} from "redux-form";
import {authAPI} from "../api/authAPI";
import {securityAPI} from "../api/securityAPI";
import {ResultCodeForCaptcha, ResultCodes} from "../api/api";

const SET_USER_DATA = 'SET-USER-DATA'
const GET_CAPTCHA_URL_SUCCESS = 'GET-CAPTCHA-URL-SUCCESS'

export type InitialStateType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string | null
}

let initialState: InitialStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {

        case "SET-USER-DATA":
        case "GET-CAPTCHA-URL-SUCCESS":

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

type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: {
        id: number | null
        login: string | null
        email: string | null
        isAuth: boolean
    }
}
export const setAuthUserData = (id: number | null, login: string | null, email: string | null, isAuth: boolean): SetAuthUserDataActionType => {
    return {
        type: 'SET-USER-DATA',
        payload: {id, login, email, isAuth}
    } as const
}

type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: {captchaUrl: string}
}
export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => {
    return {
        type: 'GET-CAPTCHA-URL-SUCCESS',
        payload: {captchaUrl}
    } as const
}

export const getAuthUser = () => async (dispatch: any) => {
    const response = await authAPI.me();
    if (response.resultCode === ResultCodes.Success) {
        let {id, login, email} = response.data;
        dispatch(setAuthUserData(id, login, email, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean) => async (dispatch: any) => {
    let data = await authAPI.login(email, password, rememberMe)
    if (data.resultCode === ResultCodes.Success) {
        dispatch(getAuthUser())
    } else {
        if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaUrl)
        }
        let messages = data.messages.length > 0 ? data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', {_error: messages}))
    }
}

export const getCaptchaUrl = () => async (dispatch: any) => {
    const data = await securityAPI.getCaptchaUrl()
    const captchaUrl = data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export const logout = () => async (dispatch: any) => {
    const data = await authAPI.logout()
    if (data.resultCode === ResultCodes.Success) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}





