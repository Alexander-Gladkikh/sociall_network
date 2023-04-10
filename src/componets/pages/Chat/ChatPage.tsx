import React, {useEffect, useRef, useState} from 'react';
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

  const status = useSelector((state: RootState) => state.chat.status)

  useEffect(() => {
    dispatch(startMessagesListening())
    return () => {
      dispatch(stopMessagesListening())
    }
  }, [])

  return (
    <div>
      {status === 'error' && <div>Some error occurred. Please refresh the page</div>}
        <>
          <Messages/>
          <AddMessageForm/>
        </>

    </div>
  )
};

const Messages: React.FC = () => {
  const messages = useSelector((state: RootState) => state.chat.messages)
  const messagesAnchorRef = useRef<HTMLDivElement>(null)
  const [isAutoScroll, setIsAutoScroll] = useState(true)

  const onScrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
      const element = e.currentTarget
    if (Math.abs( (element.scrollHeight - element.scrollTop) - element.clientHeight ) < 300) {
      !isAutoScroll && setIsAutoScroll(true)
    } else {
      isAutoScroll && setIsAutoScroll(false)
    }
  }

  useEffect(() => {
    if (messagesAnchorRef.current && isAutoScroll) {
      messagesAnchorRef.current.scrollIntoView({behavior: "smooth"})
    }
  }, [messages])

  return (
    <div style={{height: '500px', overflow: 'auto'}} onScroll={onScrollHandler}>
      {messages.map((m, index) => <Message key={index} message={m}/>)}
      <div ref={messagesAnchorRef}></div>
    </div>
  );
};

const Message: React.FC<{ message: ChatMessageType }> = React.memo(({message}) => {
  console.log('sdfvsd')
  return (
    <div>
      <img src={message.photo} alt=""/> <b>{message.userName}</b>
      <br/>
      {message.message}
      <hr/>
    </div>
  );
})

const AddMessageForm: React.FC = () => {
  const [message, setMessage] = useState('')
  const status = useSelector((state: RootState) => state.chat.status)
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
      <button disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</button>
    </div>
  )
    ;
};
