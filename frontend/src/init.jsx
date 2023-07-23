/* eslint-disable */
import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';

import resources from './locales/index';
import App from './App';
import store from './slices/index.js';
import ChatWSProvider from './contexts/ChatWSContext';
import { addMessage } from './slices/messagesSlice';
import { addChannel, updateChannel, removeChannel } from './slices/channelsSlice';

const init = async () => {
  const i18n = i18next.createInstance();
  const options = {
    resources,
    fallbackLng: 'ru',
  };
  i18n
    .use(initReactI18next)
    .init(options);

  const webSocket = io();

  webSocket.on("connect", () => {
    console.log('webSocket connected', webSocket.connected);
  });
  webSocket.on('newMessage', (payload) => {
    store.dispatch(addMessage(payload));
  });
  webSocket.on('newChannel', (payload) => {
    store.dispatch(addChannel(payload));
  });
  webSocket.on('removeChannel', (payload) => {
    store.dispatch(removeChannel(payload.id));
  });
  webSocket.on('renameChannel', (payload) => {
    store.dispatch(updateChannel({ id: payload.id, changes: { name: payload.name }}));
  });


  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ChatWSProvider webSocket={webSocket}>
          <App />
        </ChatWSProvider>
      </I18nextProvider>
    </Provider>
  );
};

export default init;