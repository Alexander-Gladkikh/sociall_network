import {profileReducer} from "./profile-reducer";
import {dialogsReducer} from "./dialogs-reducer";
import {navbarReducer} from "./navbar-reducer";

export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    friendsPage: FriendsPageType
    navBarPage: NavBarPageType
}
export type ProfilePageType = {
    posts: PostsType[]
    newPostText: string
}
export type PostsType = {
    id: number
    message: string
    countLike: number
}
export type DialogsPageType = {
    messages: MessagesType[]
    dialogs: DialogsType[]
    newMessageBody: string
}
export type DialogsType = {
    id: string
    name: string
}
export type MessagesType = {
    id: number
    message: string
}
export type FriendsPageType = {
    friends: FriendsType[]
}
export type FriendsType = {
    id: string
    name: string
}
export type NavBarPageType = {
    titlePage: NavBarType[]
}
export type NavBarType = {
    id: string
    title: string
    link: string
}

export type StoreType = {
    _state: RootStateType
    _callSubscriber: () => void
    getState: () => RootStateType
    subscribe: (callback: () => void) => void
    dispatch: (action: ActionsTypes) => void
}

export type ActionsTypes = ReturnType<typeof addPostAC>
    | ReturnType<typeof updateNewPostTextAC>
    | ReturnType<typeof updateNewMessageBodyAC>
    | ReturnType<typeof addMessageAC>


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

export let store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi, how are yuo?', countLike: 15},
                {id: 2, message: 'It\'s my first post', countLike: 20},
            ],
            newPostText: '',
        },
        dialogsPage: {
            messages: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'How is your it-kamasutra'},
                {id: 3, message: 'Yo'},
            ],
            dialogs: [
                {id: '1', name: 'Dimych'},
                {id: '2', name: 'Andrey'},
                {id: '3', name: 'Sveta'},
                {id: '4', name: 'Sasha'},
                {id: '5', name: 'Victor'},
                {id: '6', name: 'Valera'},
            ],
            newMessageBody: '',
        },
        friendsPage: {
            friends: [
                {id: '1', name: 'Andrew'},
                {id: '2', name: 'Sasha'},
                {id: '3', name: 'Sveta'},
            ]
        },
        navBarPage: {
            titlePage: [
                {id: '1', title: 'Profile', link: '/profile'},
                {id: '2', title: 'Message', link: '/dialogs'},
                {id: '3', title: 'New Posts', link: '/posts'},
                {id: '4', title: 'Music', link: '/music'},
                {id: '5', title: 'Settings', link: '/settings'},
                {id: '6', title: 'Friends', link: '/friends'},
            ]
        }
    },
    _callSubscriber() {
        console.log('State changed')
    },

    getState() {
        return this._state;
    },
    subscribe(callback) {
        this._callSubscriber = callback;
    },

    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.navBarPage = navbarReducer(this._state.navBarPage, action)

        this._callSubscriber()

    }
}







