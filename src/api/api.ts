import axios from "axios";
import {UserType} from "../types/types";

export const instance = axios.create({
        withCredentials: true,
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        headers: {
            'API-KEY': "88732962-7d6b-4220-9742-a71d3b763549"
        }
    }
)

export enum ResultCodes  {
    Success = 0,
    Error= 1
}

export enum ResultCodeForCaptcha  {
    CaptchaIsRequired = 10,
}

export type GetItemsType = {
    items: UserType[]
    totalCount: number
    error: string | null
}

export type APIResponseType<D = {}, RC = ResultCodes> = {
    data: D
    messages: Array<string>
    resultCode: RC
}







