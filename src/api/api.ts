import axios from "axios";
import {ProfileType, ResultCodeForCaptcha, ResultCodes} from "../types/types";

const instance = axios.create({
        withCredentials: true,
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        headers: {
            'API-KEY': "88732962-7d6b-4220-9742-a71d3b763549"
        }
    }
)

export const UsersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`,)
            .then(response => response.data)
    },
    unfollow(id:number) {
        return instance.delete(`follow/${id}`,)
            .then(response => response.data)
    },
    follow(id:number) {
        return instance.post(`follow/${id}`,)
            .then(response => response.data)
    },

    getProfile(profileId: number) {
        console.warn("Obsolete method. Please profileAPI object")
        return ProfileAPI.getProfile(profileId)
    }
}




export const ProfileAPI = {
    getProfile(profileId: number) {
        return instance.get(`profile/` + profileId)
    },
    getStatus(profileId: number) {
        return instance.get('profile/status/' + profileId)
    },
    updateStatus (status: string) {
        return instance.put('profile/status/', {status: status})
    },
    savePhoto (photoFile: any) {
        const formData = new FormData();
        formData.append('image', photoFile)
        return instance.put('profile/photo/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },

    saveProfile (profile: ProfileType) {
        return instance.put('profile', profile)
    },
}



type MeResponseType = {
    data: {id: number, email: string, login: string}
    resultCode: ResultCodes
    messages: Array<string>
}

type LoginResponseType = {
    resultCode: ResultCodes | ResultCodeForCaptcha
    messages: Array<string>
    data: {userId: number}
}

type LogoutResponseType = {
    resultCode: ResultCodes
    messages: Array<string>
    data: {}
}



export const authAPI = {
    me() {
        return instance.get<MeResponseType>(`auth/me`)
            .then(response => response.data)

    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
        return instance.post<LoginResponseType>('auth/login', {email, password, rememberMe, captcha})
            .then(res => res.data)
    },

    logout() {
        return instance.delete<LogoutResponseType>('auth/login' )
            .then(res => res.data)
    }
}

type GetCaptchaUrlResponseType = {
    url: string
}
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<GetCaptchaUrlResponseType>('security/get-captcha-url')
    }
}







