import {ActionsTypes} from "./redux-store";
import {ProfileAPI, UsersAPI} from "../api/api";


export type ProfilePageType = {
    posts: PostsType[]
    newPostText: string
    profile?: any
    status?: any
}
export type PostsType = {
    id: number
    message: string
    countLike: number
}

let initialState: ProfilePageType = {
    posts: [
        {id: 1, message: 'Hi, how are yuo?', countLike: 15},
        {id: 2, message: 'It\'s my first post', countLike: 20},
    ],
    newPostText: '',
    profile: null,
    status: ''
}

export const profileReducer = (state = initialState, action: ActionsTypes): ProfilePageType => {
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
                ...state, profile: {...state.profile, photos: action.photos}
            }
        default :
            return {...state}
    }

}

export const addPostAC = (newPostText: string) => {
    return {
        type: "ADD-POST",
        newPostText
    } as const
}
export const setUsersProfile = (profile: any) => {
    return {
        type: "SET-USERS-PROFILE",
        profile
    } as const
}
export const setStatus = (status: any) => {
    return {
        type: "SET-STATUS",
        status
    } as const
}
export const savePhotoSuccess = (photos: any) => {
    return {
        type: "SAVE-PHOTO-SUCCESS",
        photos
    } as const
}


export const getUserProfile = (profileId: any) => async (dispatch: any) => {
    const response = await UsersAPI.getProfile(profileId)
        dispatch(setUsersProfile(response.data))
}
export const getStatus = (profileId: any) => async (dispatch: any) => {
    const response = await ProfileAPI.getStatus(profileId)
        dispatch(setStatus(response.data))
}
export const updateStatus = (status: any) => async (dispatch: any) => {
    const response = await ProfileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
}

export const savePhoto = (file: any) => async (dispatch: any) => {
    const response = await ProfileAPI.savePhoto(file)
        if (response.data.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.data.photos))
        }
}


