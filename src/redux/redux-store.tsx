import {applyMiddleware, combineReducers, createStore} from "redux";
import {addPostAC, profileReducer, savePhotoSuccess, setStatus, setUsersProfile} from "./profile-reducer";
import {sendMessageCreator, dialogsReducer} from "./dialogs-reducer";
import {navbarReducer} from "./sidebar-reducer";
import {
    usersReducer
} from "./users-reducer";
import {authReducer, getCaptchaUrlSuccess, setAuthUserData} from "./auth-reducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from 'redux-form'
import appReducer, {initializedSuccess} from "./app-reducer";

export type ActionsTypes = ReturnType<typeof addPostAC>
    | ReturnType<typeof sendMessageCreator>
    | ReturnType<typeof setUsersProfile>
    | ReturnType<typeof setAuthUserData>
    | ReturnType<typeof setStatus>
    | ReturnType<typeof savePhotoSuccess>
    | ReturnType<typeof getCaptchaUrlSuccess>


export const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    navBarPage: navbarReducer,
    users: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
});

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never

export type InferActionsType<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>

export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));








