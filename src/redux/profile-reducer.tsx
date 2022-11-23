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
                message: action.postText,
                countLike: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            }
        case "UPDATE-NEW-POST-TEXT":
            return {
                ...state,
                newPostText: action.newText
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
        default :
            return {...state}
    }

}

export const addPostAC = (text: string) => {
    return {
        type: "ADD-POST",
        postText: text
    } as const
}

export const updateNewPostTextAC = (text: string) => {
    return {
        type: "UPDATE-NEW-POST-TEXT",
        newText: text
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

export const getUserProfile = (profileId: any) => (dispatch: any) => {
    UsersAPI.getProfile(profileId).then(response => {
        dispatch(setUsersProfile(response.data))
    })
}

export const getStatus = (profileId: any) => (dispatch: any) => {
    ProfileAPI.getStatus(profileId).then(response => {
        dispatch(setStatus(response.data))
    })
}

export const updateStatus = (status: any) => (dispatch: any) => {
    ProfileAPI.updateStatus(status).then(response => {
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }

    })
}


