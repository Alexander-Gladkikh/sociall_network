import {getAuthUser} from "./auth-reducer";
import {InferActionsType} from "./redux-store";

let initialState = {
    initialized: false
}
export type initialStateType = typeof initialState
type ActionType = InferActionsType<typeof actions>
const appReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {

    switch (action.type) {

        case "SN/APP/INITIALIZED_SUCCESS":

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

const actions = {
    initializedSuccess: () => ({type: 'SN/APP/INITIALIZED_SUCCESS'} as const)
}



export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUser())
    promise.then(
        dispatch(actions.initializedSuccess())
    )


}

export default appReducer;





