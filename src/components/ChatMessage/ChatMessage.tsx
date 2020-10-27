import React from 'react';
import PropTypes from 'prop-types';
import './ChatMessage.css';

interface ChatMessageProps {
  mine: Boolean;
  userName: string;
  text: String;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ mine, userName, text }) => (
  <li className={`message ${mine ? 'mine' : ''}`}>
    <label>{userName}</label>
    <p>{text}</p>
  </li>
)

ChatMessage.propTypes = {
  mine: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default ChatMessage;
