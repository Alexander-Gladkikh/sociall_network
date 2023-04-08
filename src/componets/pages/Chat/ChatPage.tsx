import React from 'react';

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
  const messages = [1,2,3,4]
  return (
    <div style={{height: '500px', overflow: 'auto'}}>
      {messages.map((m: any) => <Message />)}
      {messages.map((m: any) => <Message />)}
      {messages.map((m: any) => <Message />)}
    </div>
  );
};

const Message: React.FC = () => {
  const message = {
    url: 'https://via.placeholder.com/30',
    author: 'Aaaaa',
    text: 'Hello World'
  }
  return (
    <div>
      <img src={message.url} alt=""/> <b>{message.author}</b>
      <br/>
      {message.text}
      <hr/>
    </div>
  );
};

const AddMessageForm: React.FC = () => {
  return (
    <div>
      <textarea></textarea>
      <button>Send</button>
    </div>
  );
};
