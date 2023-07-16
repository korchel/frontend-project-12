/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';

import routes from '../../routes.js';
import { addMessages } from '../../slices/messagesSlice.js';
import { addChannels, setCurrentChannelId } from '../../slices/channelsSlice.js';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import getModal from '../modals/index.js';
import { openModal, closeModal } from '../../slices/modalsSlice.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }
  return {};
};

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

  const modalType = useSelector((state) => state.modalsReducer.type);

  useEffect(() => {
    axios.get(routes.usersPath(), { headers: getAuthHeader() })
      .then((responce) => {
        const { channels, messages, currentChannelId } = responce.data;
        dispatch(addChannels(channels));
        dispatch(addMessages(messages));
        dispatch(setCurrentChannelId(currentChannelId));
      })
      .catch((error) => {
        if (error.isAxiosError && error.response.status === 401) {
          navigate('/login');
          return;
        }
        return;
      });
  });

  const showModal = (type, id = null) => {
    dispatch(openModal({type, id}));
  };

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels showModal={showModal}/>
        <Messages />
      </Row>
      {renderModal(modalType)}
    </Container>
  );
};

export default Chat;
