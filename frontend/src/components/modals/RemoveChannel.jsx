/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import useChatWS from '../../hooks/useChatWS.js';
import { closeModal } from '../../slices/modalsSlice.js';

const RemoveChannel = () => {
  const { deleteChannel } = useChatWS();
  const removedChannelId = useSelector((state) => state.modalsReducer.channelId);
  const dispatch = useDispatch();

  const handleDelete = () => {
    deleteChannel(removedChannelId);
    dispatch(closeModal())
  };

  const hideModal = () => {
    dispatch(closeModal());
  };

  return (
    <Modal show onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Вы уверенны?</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={hideModal}>
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