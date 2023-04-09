import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";

const wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

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

  return (
    <div>
      <Messages/>
      <AddMessageForm/>
    </div>
  );
};

const Messages: React.FC = () => {

  const [messages, setMessages] = useState<ChatMessageType[]>([])

  useEffect(() => {
    wsChannel.addEventListener('message', (e) => {
      let newMessages = JSON.parse((e.data));
      setMessages((prevMessages) => [...prevMessages, ...newMessages])
    })
  }, [])

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
  const sendMessage = () => {
    if (!message) {
      return
    }
    wsChannel.send(message)
    setMessage('')
  }

  return (
  <div>
    <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
    <button onClick={sendMessage}>Send</button>
  </div>
)
  ;
};
