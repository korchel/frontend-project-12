import React, { createContext } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentChannelId, removeChannel, updateChannel } from '../slices/channelsSlice';

export const ChatWSContext = createContext();

const ChatWSProvider = ({ webSocket, children }) => {
  const dispatch = useDispatch();

  const sendMessage = (message) => {
    webSocket.emit('newMessage', message);
  };

  const addChannel = (channel, notify) => {
    webSocket.emit('newChannel', channel, (response) => {
      const { status, data } = response;
      if (status === 'ok') {
        dispatch(setCurrentChannelId(data.id));
      }
      notify(status);
    });
  };

  const deleteChannel = (id, notify) => {
    webSocket.emit('removeChannel', { id }, (response) => {
      const { status } = response;
      if (response.status === 'ok') {
        dispatch(removeChannel(id));
      }
      notify(status);
    });
  };

  const renameChannel = (name, id, notify) => {
    webSocket.emit('renameChannel', { name, id }, (response) => {
      const { status } = response;
      if (status === 'ok') {
        dispatch(updateChannel({ id, changes: { name } }));
      }
      notify(status);
    });
  };

  return (
    <ChatWSContext.Provider value={{
      sendMessage, addChannel, deleteChannel, renameChannel,
    }}
    >
      {children}
    </ChatWSContext.Provider>
  );
};

export default ChatWSProvider;
