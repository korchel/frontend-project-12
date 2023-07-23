/* eslint-disable */
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import useChatWS from '../../hooks/useChatWS.js';
import { closeModal } from '../../slices/modalsSlice.js';

const RemoveChannel = () => {
  const { t } = useTranslation();
  const { deleteChannel } = useChatWS();
  const removedChannelId = useSelector((state) => state.modalsReducer.channelId);
  const dispatch = useDispatch();

  const notify = (status) => {
    if (status === 'ok') {
      toast.success(t('chat.modals.channelRemoved'));
    } 
    if (status !== 'ok') {
      toast.warning(t('chat.modals.channelNotRemoved'));
    }
  };

  const handleDelete = () => {
    deleteChannel(removedChannelId, notify);
    dispatch(closeModal())
  };

  const hideModal = () => {
    dispatch(closeModal());
  };

  return (
    <Modal show onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('chat.modals.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('chat.modals.areYouSure')}</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={hideModal}>
            {t('chat.modals.cancel')}
          </Button>
          <Button type="submit" variant="danger" onClick={handleDelete}>
            {t('chat.modals.remove')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;