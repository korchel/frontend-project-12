/* eslint-disable */
import React, { createContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage } from '../slices/messagesSlice';
import { setCurrentChannelId, removeChannel, updateChannel } from '../slices/channelsSlice';

export const ChatWSContext = createContext();

const ChatWSProvider = ({ webSocket, children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    webSocket.on("connect", () => {
      console.log('webSocket connected', webSocket.connected);
    });
    webSocket.on('newMessage', (payload) => {
      dispatch(addMessage(payload));
    });
  }, [webSocket]);

  const sendMessage = (message) => {
    webSocket.emit('newMessage', message);
  };

  const addChannel = (channel) => {
    webSocket.emit('newChannel', channel, (response) => {
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

  const renameChannel = (newName, id) => {
    webSocket.emit('renameChannel', {newName, id}, (response) => {
      if (response.status === 'ok') {
        dispatch(updateChannel({ id, changes: {name: newName}}));
      }
    });
  };

  return (
    <ChatWSContext.Provider value={{sendMessage, addChannel, deleteChannel, renameChannel}}>
      {children}
    </ChatWSContext.Provider>
  )
};

export default ChatWSProvider;