/* eslint-disable */
import { useContext } from 'react';
import { ChatWSContext } from '../contexts/ChatWSContext.jsx';

const useChatWS = () => useContext(ChatWSContext);

export default useChatWS;