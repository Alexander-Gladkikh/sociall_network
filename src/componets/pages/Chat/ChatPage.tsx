import React, {useEffect, useState} from 'react';
import {useAppDispatch} from "../../../hook/hook";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../../redux/chat-reducer";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/redux-store";

type ChatMessageType = {
  message: string
  photo: string
  userId: number
  userName: string
}

const ChatPage: React.FC = () => {
  return (
    <div>
      <Chat/>
    </div>
  );
};
export default ChatPage

const Chat: React.FC = () => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(startMessagesListening())
    return () => {
      dispatch(stopMessagesListening())
    }
  }, [])

  return (
    <div>
      <Messages/>
      <AddMessageForm/>
    </div>
  );
};

const Messages: React.FC = () => {

  const messages = useSelector((state: RootState) => state.chat.messages)

  return (
    <div style={{height: '500px', overflow: 'auto'}}>
      {messages.map((m, index) => <Message key={index} message={m}/>)}
    </div>
  );
};

const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {

  return (
    <div>
      <img src={message.photo} alt=""/> <b>{message.userName}</b>
      <br/>
      {message.message}
      <hr/>
    </div>
  );
};

const AddMessageForm: React.FC = () => {
  const [message, setMessage] = useState('')
  const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')
  const dispatch = useAppDispatch()

  const sendMessageHandler = () => {
    if (!message) {
      return
    }
    dispatch(sendMessage(message))
    setMessage('')
  }

  return (
    <div>
      <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
      <button disabled={false} onClick={sendMessageHandler}>Send</button>
    </div>
  )
    ;
};
