import {combineReducers, createStore, EmptyObject, Store,} from "redux";
import {ProfilePageType, profileReducer} from "./profile-reducer";
import {DialogsPageType, dialogsReducer} from "./dialogs-reducer";
import {NavBarPageType, navbarReducer} from "./navbar-reducer";
import {UsersPageType, usersReducer, UsersType} from "./users-reducer";


export type StoreType = Store<EmptyObject & {
    profilePage: ProfilePageType,
    dialogsPage: DialogsPageType,
    navBarPage: NavBarPageType,
    userPage: UsersPageType}, ActionsTypes>

export type ActionsTypes = ReturnType<typeof addPostAC>
    | ReturnType<typeof updateNewPostTextAC>
    | ReturnType<typeof updateNewMessageBodyAC>
    | ReturnType<typeof addMessageAC>
    | ReturnType<typeof followAC>
    | ReturnType<typeof unfollowAC>
    | ReturnType<typeof setUsersAC>

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
export const updateNewMessageBodyAC = (message: string) => {
    return {
        type: 'UPDATE-NEW-MESSAGE-BODY',
        body: message
    } as const
}
export const addMessageAC = (text: string) => {
    return {
        type: "ADD-MESSAGE",
        textMessage: text
    } as const
}
export const followAC = (userId: number) => ({type: 'FOLLOW', userId} as const)
export const unfollowAC = (userId: number) => ({type: 'UNFOLLOW', userId} as const)
export const setUsersAC = (users: UsersType) => ({type: 'SET_USERS', users} as const)


let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    navBarPage: navbarReducer,
    userPage: usersReducer,
});

export type AppStateType = ReturnType<typeof rootReducer>

export let store = createStore(rootReducer);




