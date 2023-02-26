import {ActionsTypes} from "./redux-store";
import {stopSubmit} from "redux-form";
import {PhotosType, PostsType, ProfileType} from "../types/types";
import {usersAPI} from "../api/usersAPI";
import {profileAPI} from "../api/profileAPI";
import {ResultCodes} from "../api/api";

const SAVE_PHOTO_SUCCESS = "SAVE-PHOTO-SUCCESS"
const SET_STATUS = "SET-STATUS"
const SET_USERS_PROFILE = "SET-USERS-PROFILE"
const ADD_POST = "ADD-POST"



let initialState= {
    posts: [
        {id: 1, message: 'Hi, how are yuo?', countLike: 15},
        {id: 2, message: 'It\'s my first post', countLike: 20},
    ] as PostsType[],
    newPostText: '',
    profile: null as ProfileType | null,
    status: ''
}

type InitialStateType = typeof initialState

export const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "ADD-POST":
            let newPost: PostsType = {
                id: new Date().getTime(),
                message: action.newPostText,
                countLike: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            }
            case "SET-USERS-PROFILE":
            return {
                ...state,
                profile: action.profile
            }
            case "SET-STATUS":
            return {
                ...state,
                status: action.status
            }
        case "SAVE-PHOTO-SUCCESS":
            return {
                ...state, profile: {...state.profile, photos: action.photos} as ProfileType
            }
        default :
            return {...state}
    }

}

type AddPostACActionType = {
    type: typeof ADD_POST
    newPostText: string
}
export const addPostAC = (newPostText: string): AddPostACActionType => {
    return {
        type: "ADD-POST",
        newPostText
    } as const
}

type SetUsersProfileActionType = {
    type: typeof SET_USERS_PROFILE
    profile: ProfileType
}
export const setUsersProfile = (profile: ProfileType): SetUsersProfileActionType => {
    return {
        type: "SET-USERS-PROFILE",
        profile
    } as const
}

type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status: string): SetStatusActionType => {
    return {
        type: "SET-STATUS",
        status
    } as const
}

type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => {
    return {
        type: "SAVE-PHOTO-SUCCESS",
        photos
    } as const
}


export const getUserProfile = (profileId: number) => async (dispatch: any) => {
    const data = await profileAPI.getProfile(profileId)
        dispatch(setUsersProfile(data))
}
export const getStatus = (profileId: number) => async (dispatch: any) => {
    const data = await profileAPI.getStatus(profileId)
        dispatch(setStatus(data))
}
export const updateStatus = (status: string) => async (dispatch: any) => {
    const data = await profileAPI.updateStatus(status)
        if (data.resultCode === ResultCodes.Success) {
            dispatch(setStatus(status))
        }
}

export const savePhoto = (file: any) => async (dispatch: any) => {
    const data = await profileAPI.savePhoto(file)
        if (data.resultCode === ResultCodes.Success) {
            dispatch(savePhotoSuccess(data.data.photos))
        }
}

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.id
    const data = await profileAPI.saveProfile(profile)
    if (data.resultCode === ResultCodes.Success) {
        dispatch(getUserProfile(userId))
    }
    else {
        dispatch(stopSubmit('edit-profile', {_error: data.messages[0]}))
    }
}


