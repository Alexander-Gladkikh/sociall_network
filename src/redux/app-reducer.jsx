import {ActionsTypes} from "./redux-store";
import {authAPI, UsersAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {getAuthUser} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'

let initialState = {
    initialized: false
}

const appReducer = (state = initialState, action) => {

    switch (action.type) {

        case INITIALIZED_SUCCESS:

            return {
                ...state,
                initialized: true
            }
        default:
            return {
                ...state
            }
    }

}

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS})

export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getAuthUser())
    promise.then(
        dispatch(initializedSuccess())
    )



}

export default appReducer;





