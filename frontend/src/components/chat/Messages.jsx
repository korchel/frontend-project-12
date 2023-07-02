/* eslint-disable */
import React from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';

// import { selectors as messagesSelectors } from '../../slices/messagesSlice.js';
// import { selectors as channelsSelectors } from '../../slices/channelsSlice.js';

import MessagesHeader from './MessagesHeader.jsx';
import MessagesInput from './MessagesInput.jsx';

const Messages = () => {
  const currentChannelId = useSelector((state) => state.channelsReducer.currentChannelId);

  const currentChannel = useSelector((state) => {
    return state.channelsReducer.entities[currentChannelId];
  });

  const currentsMessages = useSelector((state) => {
    const allMessages = state.messagesReducer.ids.map((id) => state.messagesReducer.entities[id]);
    return allMessages.filter((message) => message.channelId === currentChannelId);
  });

  const numberOfMessages = currentsMessages.length;

  return (
    <Col className="p-0 h-100">
      <MessagesHeader
        currentChannelName={currentChannel.name}
        numberOfMessages={numberOfMessages}
      />
      <p>something</p>
      <MessagesInput/>
    </Col>
  );
};

export default Messages;
