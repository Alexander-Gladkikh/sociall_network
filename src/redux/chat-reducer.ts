import {AppThunk, BaseThunkType, InferActionsType} from "./redux-store";
import {stopSubmit} from "redux-form";
import {authAPI} from "../api/authAPI";
import {securityAPI} from "../api/securityAPI";
import {ResultCodeForCaptcha, ResultCodes} from "../api/api";
import {chatApi, ChatMessageType, StatusType} from "../api/chat-api";
import {message} from "antd";
import {Dispatch} from "redux";

let initialState = {
  messages: [] as ChatMessageType[],
  status: 'pending' as StatusType
};

export const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {

  switch (action.type) {

    case "SN/chat/MESSAGE_RECEIVED":
      return {
        ...state,
        messages: [...state.messages, ...action.payload]
      }
      case "SN/chat/STATUS_CHANGED":
      return {
        ...state,
        status: action.payload.status
      }
    default:
      return state
  }

}

const actions = {
  messagesReceived: (messages: ChatMessageType[]) => ({
    type: 'SN/chat/MESSAGE_RECEIVED', payload: messages
  } as const),
  statusChanged: (status: StatusType) => ({
    type: 'SN/chat/STATUS_CHANGED', payload: {status}
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

let _newStatusChangedHandler: ((status: StatusType) => void) | null = null

const statusChangedHandlerCreator = (dispatch: Dispatch) => {
  if (_newStatusChangedHandler === null) {
    _newStatusChangedHandler = (status:StatusType) => {
      dispatch(actions.statusChanged(status))
    }
  }
  return _newStatusChangedHandler
}

export const startMessagesListening = (): AppThunk => async dispatch => {
  chatApi.start()
  chatApi.subscribe('messages-received', newMessageHandlerCreator(dispatch))
  chatApi.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
}

export const stopMessagesListening = (): AppThunk => async dispatch => {
  chatApi.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
  chatApi.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
}

export const sendMessage = (message: string): AppThunk => async dispatch => {
  chatApi.sendMessage(message)
}

type InitialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actions>



