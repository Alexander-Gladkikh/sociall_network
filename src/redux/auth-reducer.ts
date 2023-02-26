import {BaseThunkType, InferActionsType} from "./redux-store";
import {stopSubmit} from "redux-form";
import {authAPI} from "../api/authAPI";
import {securityAPI} from "../api/securityAPI";
import {ResultCodeForCaptcha, ResultCodes} from "../api/api";



let initialState = {
    id: null as (number | null),
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
};

export const authReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {

        case "SN/auth/GET-CAPTCHA-URL-SUCCESS":
        case "SN/auth/SET-USER-DATA":
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

const actions = {
    setAuthUserData: (id: number | null, login: string | null, email: string | null, isAuth: boolean) => {
        return {
            type: 'SN/auth/SET-USER-DATA',
            payload: {id, login, email, isAuth}
        } as const
    },
    getCaptchaUrlSuccess: (captchaUrl: string) => {
        return {
            type: 'SN/auth/GET-CAPTCHA-URL-SUCCESS',
            payload: {captchaUrl}
        } as const
    }
}

export const getAuthUser = (): ThunkType => async (dispatch) => {
    const response = await authAPI.me();
    if (response.resultCode === ResultCodes.Success) {
        let {id, login, email} = response.data;
        dispatch(actions.setAuthUserData(id, login, email, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean): ThunkType => async (dispatch) => {
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

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl()
    const captchaUrl = data.url
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}

export const logout = (): ThunkType => async (dispatch) => {
    const data = await authAPI.logout()
    if (data.resultCode === ResultCodes.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}


type InitialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<ActionsType | ReturnType<typeof stopSubmit>>


