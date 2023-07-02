/* eslint-disable */
import React, { createContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage } from '../slices/messagesSlice';

export const ChatWSContext = createContext();

const ChatWSProvider = ({ webSocket, children }) => {
  const dispath = useDispatch();

  useEffect(() => {
    webSocket.on('newMessage', (payload) => {
      dispath(addMessage(payload))
    });
  }, [webSocket]);

  const sendMessage = (message) => {
    webSocket.emit('newMessage', message);
  };

  return (
    <ChatWSContext.Provider value={sendMessage}>
      {children}
    </ChatWSContext.Provider>
  )
};

export default ChatWSProvider;