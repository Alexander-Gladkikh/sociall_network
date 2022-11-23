import {applyMiddleware, combineReducers, createStore} from "redux";
import {addPostAC, profileReducer, setStatus, setUsersProfile, updateNewPostTextAC} from "./profile-reducer";
import {dialogsReducer} from "./dialogs-reducer";
import {navbarReducer} from "./navbar-reducer";
import {
    followSuccess,
    setCurrentPage,
    setTotalUserCount,
    setUsers, toggleFollowingProgress,
    toggleIsFetching,
    unfollowSuccess,
    usersReducer
} from "./users-reducer";
import {authReducer, setAuthUserData} from "./auth-reducer";
import thunkMiddleware from "redux-thunk";


// export type StoreType = Store<EmptyObject & {
//     profilePage: ProfilePageType,
//     dialogsPage: DialogsPageType,
//     navBarPage: NavBarPageType,
//     userPage: UserPageType
// }, ActionsTypes>

export type ActionsTypes = ReturnType<typeof addPostAC>
    | ReturnType<typeof updateNewPostTextAC>
    | ReturnType<typeof updateNewMessageBodyAC>
    | ReturnType<typeof addMessageAC>
    | ReturnType<typeof followSuccess>
    | ReturnType<typeof unfollowSuccess>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUserCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof setUsersProfile>
    | ReturnType<typeof setAuthUserData>
    | ReturnType<typeof toggleFollowingProgress>
    | ReturnType<typeof setStatus>


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


export const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    navBarPage: navbarReducer,
    users: usersReducer,
    auth: authReducer
});

export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));






