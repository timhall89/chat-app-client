import React, { useState, useEffect, useCallback } from 'react';
import io from "socket.io-client"
import "./App.css"

const socket = io('localhost:3001')

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const appendMessage = (message: string) => setMessages(currentMessages => [...currentMessages, message]);
  const [newMessage, setNewMessage] = useState('');

  const onSubmit: React.FormEventHandler = e => {
    appendMessage(newMessage);
    socket.emit('chat message', newMessage);
    setNewMessage('');
    e.preventDefault();
  }
  useEffect(() => {
    socket.on('chat message', (msg: string) => {
      appendMessage(msg);
    });
  }, [])

  const onNewMessageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        Chatty
      </header>
      <main className="main-grid">
        <div className="message-list-wrapper">
          <ul className="message-list">
            {messages.map(message => <li className="message">{message}</li>)}
          </ul>
        </div>
        <form onSubmit={onSubmit} className="message-form">
          <input value={newMessage} id="m" autoComplete="off" name="newMessage" onChange={onNewMessageChange} />
          <button type="submit">Send</button>
        </form>
      </main>
    </div>
  );
}

export default App;
