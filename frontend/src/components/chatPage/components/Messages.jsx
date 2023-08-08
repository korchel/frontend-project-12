import React from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';

import { selectors as messagesSelectors } from '../../../slices/messagesSlice.js';
import { getCurrentChannelId, getCurrentChannel } from '../../../slices/channelsSlice.js';

import MessagesHeader from './MessagesHeader.jsx';
import MessagesBox from './MessagesBox.jsx';
import MessagesInput from './MessagesInput.jsx';

const Messages = () => {
  const currentChannelId = useSelector(getCurrentChannelId);
  const currentChannel = useSelector(getCurrentChannel);

  const messages = useSelector(messagesSelectors.selectAll);

  const currentsMessages = messages.filter((message) => message.channelId === currentChannelId);

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <MessagesHeader
          currentChannelName={currentChannel?.name}
          numberOfMessages={currentsMessages?.length}
        />
        <MessagesBox messages={currentsMessages} />
        <MessagesInput currentChannelId={currentChannelId} />
      </div>
    </Col>
  );
};

export default Messages;
