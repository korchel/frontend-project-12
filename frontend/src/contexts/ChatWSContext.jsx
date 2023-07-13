/* eslint-disable */
import React, { createContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage } from '../slices/messagesSlice';
import { setCurrentChannelId, removeChannel } from '../slices/channelsSlice';

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
      console.log(response.data.id)
      dispatch(setCurrentChannelId(response.data.id));
    });
  };

  const deleteChannel = (id) => {
    webSocket.emit('removeChannel', {id}, (response) => {
      if (response.status === 'ok') {
        dispatch(removeChannel(id));
      }
    });
  };

  return (
    <ChatWSContext.Provider value={{sendMessage, addChannel, deleteChannel}}>
      {children}
    </ChatWSContext.Provider>
  )
};

export default ChatWSProvider;