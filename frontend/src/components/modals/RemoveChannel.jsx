/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import useChatWS from '../../hooks/useChatWS.js';

const RemoveChannel = ({ onHide }) => {
  const { deleteChannel } = useChatWS();
  const removedChannelId = useSelector((state) => state.modalsReducer.channelId);

  const handleDelete = () => {
    deleteChannel(removedChannelId);
    onHide();
  };

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Вы уверенны?</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={onHide}>
            Отменить
          </Button>
          <Button type="submit" variant="danger" onClick={handleDelete}>
            Удалить
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;