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
import {reducer as formReducer} from 'redux-form'

export type ActionsTypes = ReturnType<typeof addPostAC>
    | ReturnType<typeof updateNewPostTextAC>
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


export const addMessageAC = (newMessageBody: string) => {
    return {
        type: "ADD-MESSAGE",
        newMessageBody
    } as const
}


export const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    navBarPage: navbarReducer,
    users: usersReducer,
    auth: authReducer,
    form: formReducer,
});

export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));








