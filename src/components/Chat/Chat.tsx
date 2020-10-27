import React, { useState, useEffect, useCallback } from 'react'
import './Chat.css';
import PropTypes, { Requireable, string } from 'prop-types';
import io from "socket.io-client"
import { v4 as uuidv4 } from 'uuid';
import ChatMessage from '../ChatMessage';

import User from '../../types/User';
import Message from '../../types/Message';

interface ChatProps {
  user: User;
  roomId: string;
};

const socket = io('localhost:3001')

const Chat: React.FC<ChatProps> = ({ user, roomId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const appendMessage = (message: Message) => setMessages(currentMessages => [...currentMessages, message]);
  const [newMessageText, setNewMessageText] = useState('');

  const onSubmit: React.FormEventHandler = e => {
    e.preventDefault();
    const newMessage = {
      id: uuidv4(),
      user,
      text: newMessageText,
    }
    appendMessage(newMessage);
    socket.emit('chat message', newMessage);
    setNewMessageText('');
  }
  useEffect(() => {
    socket.on('chat message', (message: Message) => {
      appendMessage(message);
    });
  }, [])

  const onNewMessageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessageText(e.target.value);
  }, []);

  return (
    <div className="chat-grid">
      <div className="message-list-wrapper">
        <ul className="message-list">
          {messages.map(message => (
            <ChatMessage
              key={message.id}
              mine={user.id === message.user.id}
              userName={message.user.name}
              text={message.text}
            />
          ))}
        </ul>
      </div>
      <form onSubmit={onSubmit} className="message-form">
        <input value={newMessageText} id="m" autoComplete="off" name="newMessage" onChange={onNewMessageChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

Chat.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  roomId: PropTypes.string.isRequired,
}

export default Chat;
