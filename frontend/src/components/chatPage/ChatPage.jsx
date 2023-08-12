import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';

import { useAuth } from '../../contexts/authContext/AuthContext.jsx';
import { fetchMessages } from '../../slices/messagesSlice.js';
import { fetchChannels,
  // getLoadingError as channelsError,
  // getloadingState as channelsSate,
} from '../../slices/channelsSlice.js';
import Channels from './components/Channels.jsx';
import Messages from './components/Messages.jsx';
import getModal from '../modals/index.js';
import { openModal, getModalType } from '../../slices/modalsSlice.js';

const renderModal = (type) => {
  if (!type) {
    return null;
  }
  const Component = getModal(type);
  return <Component />;
};

const Chat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const modalType = useSelector(getModalType);

  // const loadingChannelsError = useSelector(channelsError);
  // const loadingChannelsState = useSelector(channelsSate);


  const { token } = useAuth();

  useEffect(() => {
    dispatch(fetchChannels(token));
    dispatch(fetchMessages(token));
    // if (error.isAxiosError && error.response.status === 401) {
    //   navigate('/login');
    // }
  }, [dispatch, navigate, token]);

  const showModal = (type, id = null) => {
    dispatch(openModal({ type, id }));
  };

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">

      <Row className="h-100 bg-white flex-md-row">
        <Channels showModal={showModal} />
        <Messages />
      </Row>
      {renderModal(modalType)}
    </Container>
  );
};

export default Chat;
