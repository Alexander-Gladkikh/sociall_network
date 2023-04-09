import React, {useEffect, useState} from 'react';

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

  const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)

  useEffect(() => {
    let ws: WebSocket
    let closeHandler = () => {
      console.log('CLOSE WS')
      setTimeout(createChannel, 3000)
    }

    function createChannel() {
      if (ws !== null) {
        ws.removeEventListener('close', closeHandler)
        ws.close()
      }
      ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
      ws.addEventListener('close', closeHandler)
      setWsChannel(ws)
    }

    createChannel()

    return () => {
      ws.removeEventListener('close', closeHandler)
      ws.close()
    }

  }, [])

  return (
    <div>
      <Messages wsChannel={wsChannel}/>
      <AddMessageForm wsChannel={wsChannel}/>
    </div>
  );
};

const Messages: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {

  const [messages, setMessages] = useState<ChatMessageType[]>([])

  useEffect(() => {
    let messageHandler = (e: MessageEvent) => {
      let newMessages = JSON.parse((e.data));
      setMessages((prevMessages) => [...prevMessages, ...newMessages])
    }
    if (wsChannel !== null) {
      wsChannel.addEventListener('message', messageHandler)
    }

    return () => {
      if (wsChannel !== null) {
        wsChannel.removeEventListener('message', messageHandler)
      }
    }
  }, [wsChannel])

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

const AddMessageForm: React.FC<{ wsChannel: any }> = ({wsChannel}) => {
  const [message, setMessage] = useState('')
  const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

  useEffect(() => {
    let openHandler = () => {
      setReadyStatus('ready')
    }
    if (wsChannel !== null) {
      wsChannel.addEventListener('open', openHandler)
    }
    return () => {
      if (wsChannel !== null) {
        wsChannel.removeEventListener('open', openHandler)
      }
    }
  }, [wsChannel])

  const sendMessage = () => {
    if (!message) {
      return
    }
    if (wsChannel !== null){
      wsChannel.send(message)
    }
    setMessage('')
  }

  return (
    <div>
      <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
      <button disabled={wsChannel === null || readyStatus !== 'ready'} onClick={sendMessage}>Send</button>
    </div>
  )
    ;
};
