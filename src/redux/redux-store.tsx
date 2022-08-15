import {combineReducers, createStore, } from "redux";
import {profileReducer} from "./profile-reducer";
import {dialogsReducer} from "./dialogs-reducer";
import {navbarReducer} from "./navbar-reducer";


let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    navBarPage: navbarReducer
});

export type AppStateType = ReturnType<typeof rootReducer>

export let store = createStore(rootReducer);




