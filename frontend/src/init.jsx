/* eslint-disable */
import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';

import resources from './locales/index';
import App from './App';
import { io } from 'socket.io-client';

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
  return (
    <I18nextProvider i18n={i18n}>
      <App webSocket={webSocket} />
    </I18nextProvider>
  )
}

export default init;