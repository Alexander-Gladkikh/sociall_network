import {AppThunk, BaseThunkType, InferActionsType} from "./redux-store";
import {stopSubmit} from "redux-form";
import {authAPI} from "../api/authAPI";
import {securityAPI} from "../api/securityAPI";
import {ResultCodeForCaptcha, ResultCodes} from "../api/api";
import {chatApi, ChatMessageType} from "../api/chat-api";
import {message} from "antd";
import {Dispatch} from "redux";


let initialState = {
  messages: [] as ChatMessageType[],
};

export const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {

  switch (action.type) {

    case "SN/chat/MESSAGE_RECEIVED":
      return {
        ...state,
        messages: [...state.messages, ...action.payload]
      }
    default:
      return state
  }

}

const actions = {
  messagesReceived: (messages: ChatMessageType[]) => ({
    type: 'SN/chat/MESSAGE_RECEIVED', payload: messages
  } as const)
}

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages: ChatMessageType[]) => {
      dispatch(actions.messagesReceived(messages))
    }
  }
  return _newMessageHandler
}

export const startMessagesListening = (): AppThunk => async dispatch => {
  chatApi.start()
  chatApi.subscribe(newMessageHandlerCreator(dispatch))
}

export const stopMessagesListening = (): AppThunk => async dispatch => {
  chatApi.unsubscribe(newMessageHandlerCreator(dispatch))
}

export const sendMessage = (message: string): AppThunk => async dispatch => {
  chatApi.sendMessage(message)
}

type InitialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actions>



