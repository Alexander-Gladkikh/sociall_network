import {getAuthUser} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'

export type initialStateType = {
    initialized: boolean
}

let initialState = {
    initialized: false
}

const appReducer = (state: initialStateType = initialState, action: InitializedSuccessActionType): initialStateType => {

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

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): InitializedSuccessActionType => ({type: INITIALIZED_SUCCESS})

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUser())
    promise.then(
        dispatch(initializedSuccess())
    )


}

export default appReducer;





