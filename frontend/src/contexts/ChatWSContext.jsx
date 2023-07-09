/* eslint-disable */
import React, { createContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage } from '../slices/messagesSlice';
import { setCurrentChannelId } from '../slices/channelsSlice';

export const ChatWSContext = createContext();

const ChatWSProvider = ({ webSocket, children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    webSocket.on("connect", () => {
      console.log('webSocket connected', webSocket.connected);
    });
    webSocket.on('newMessage', (payload) => {
      dispatch(addMessage(payload))
    });
  }, [webSocket]);

  const sendMessage = (message) => {
    webSocket.emit('newMessage', message);
  };

  const addChannel = (channel) => {
    webSocket.emit('newChannel', channel, (response) => {
      dispatch(setCurrentChannelId(response.data));
    });
  };

  const removeChannel = (id) => {
    webSocket.emit('removeChannel', {id}, (response) => {
      console.log(response);
    });
  };

  return (
    <ChatWSContext.Provider value={{sendMessage, addChannel, removeChannel}}>
      {children}
    </ChatWSContext.Provider>
  )
};

export default ChatWSProvider;