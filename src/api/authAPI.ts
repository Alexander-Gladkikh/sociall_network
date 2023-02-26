import {instance, APIResponseType, ResultCodeForCaptcha, ResultCodes} from "./api";

type MeResponseData = {
    id: number
    email: string
    login: string
}

type LoginResponseData = {
    userId: number
}

export const authAPI = {
    me() {
        return instance.get<APIResponseType<MeResponseData>>(`auth/me`)
            .then(response => response.data)

    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
        return instance.post<APIResponseType<LoginResponseData, ResultCodes | ResultCodeForCaptcha>>('auth/login', {email, password, rememberMe, captcha})
            .then(res => res.data)
    },

    logout() {
        return instance.delete('auth/login')
            .then(res => res.data)
    }
}