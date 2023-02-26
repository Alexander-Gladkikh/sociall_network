import {BaseThunkType, InferActionsType} from "./redux-store";
import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostsType, ProfileType} from "../types/types";
import {profileAPI} from "../api/profileAPI";
import {ResultCodes} from "../api/api";

let initialState= {
    posts: [
        {id: 1, message: 'Hi, how are yuo?', countLike: 15},
        {id: 2, message: 'It\'s my first post', countLike: 20},
    ] as PostsType[],
    newPostText: '',
    profile: null as ProfileType | null,
    status: ''
}

export const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "'SN/PROFILE/ADD-POST'":
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
            case "'SN/PROFILE/SET-USERS-PROFILE'":
            return {
                ...state,
                profile: action.profile
            }
            case "'SN/PROFILE/SET-STATUS'":
            return {
                ...state,
                status: action.status
            }
        case "'SN/PROFILE/SAVE-PHOTO-SUCCESS'":
            return {
                ...state, profile: {...state.profile, photos: action.photos} as ProfileType
            }
        default :
            return {...state}
    }

}

export const actions = {
    addPostAC: (newPostText: string) => {
        return {
            type: "'SN/PROFILE/ADD-POST'",
            newPostText
        } as const
    },
    setUsersProfile: (profile: ProfileType) => {
        return {
            type: "'SN/PROFILE/SET-USERS-PROFILE'",
            profile
        } as const
    },
    setStatus: (status: string) => {
        return {
            type: "'SN/PROFILE/SET-STATUS'",
            status
        } as const
    },
    savePhotoSuccess: (photos: PhotosType) => {
        return {
            type: "'SN/PROFILE/SAVE-PHOTO-SUCCESS'",
            photos
        } as const
    }
}

export const getUserProfile = (profileId: number):ThunkType => async (dispatch) => {
    const data = await profileAPI.getProfile(profileId)
        dispatch(actions.setUsersProfile(data))
}
export const getStatus = (profileId: number):ThunkType => async (dispatch) => {
    const data = await profileAPI.getStatus(profileId)
        dispatch(actions.setStatus(data))
}
export const updateStatus = (status: string):ThunkType => async (dispatch) => {
    const data = await profileAPI.updateStatus(status)
        if (data.resultCode === ResultCodes.Success) {
            dispatch(actions.setStatus(status))
        }
}

export const savePhoto = (file: File):ThunkType => async (dispatch) => {
    const data = await profileAPI.savePhoto(file)
        if (data.resultCode === ResultCodes.Success) {
            dispatch(actions.savePhotoSuccess(data.data.photos))
        }
}

export const saveProfile = (profile: ProfileType):ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.id
    const data = await profileAPI.saveProfile(profile)
    if (data.resultCode === ResultCodes.Success) {
        if (userId != null) {
             dispatch(getUserProfile(userId))
        }
       else {
           throw new Error('userId cant be null')
        }
    }
    else {
        dispatch(stopSubmit('edit-profile', {_error: data.messages[0]}))
    }
}


type InitialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

