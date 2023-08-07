import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Modal, Form, Button, FormControl, FormLabel,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useChatWS } from '../../contexts/chatWSContext/ChatWSContext.jsx';
import { selectors } from '../../slices/channelsSlice.js';
import { closeModal } from '../../slices/modalsSlice.js';

const RenameChannel = () => {
  const { t } = useTranslation();
  const { renameChannel } = useChatWS();
  const dispatch = useDispatch();
  const inputRef = useRef();

  const channels = useSelector(selectors.selectAll);
  const channelsNames = channels.map((channel) => channel.name);
  const renamedChannelId = useSelector((state) => state.modalsReducer.channelId);
  const [renamedChannel] = channels.filter((channel) => channel.id === renamedChannelId);

  const notify = (status) => {
    if (status === 'ok') {
      toast.success(t('chat.modals.channelRenamed'));
    }
    if (status !== 'ok') {
      toast.warning(t('chat.modals.connectionError'));
    }
  };

  const getValidationSchema = () => Yup.object().shape({
    newName: Yup.string()
      .required()
      .min(3, t('chat.modals.nameLength'))
      .max(20, t('chat.modals.nameLength'))
      .notOneOf(channelsNames, t('chat.modals.nameExists')),
  });

  const formik = useFormik({
    initialValues: { newName: renamedChannel.name },
    onSubmit: ({ newName }) => {
      renameChannel(newName, renamedChannelId, notify);
      dispatch(closeModal());
    },
    validationSchema: getValidationSchema(),
  });

  const hideModal = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    inputRef.current.select();
  }, []);

  return (
    <Modal show onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('chat.modals.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <FormLabel className="visually-hidden" htmlFor="newName">
              {t('chat.modals.channelName')}
            </FormLabel>
            <FormControl
              className="mb-2"
              onChange={formik.handleChange}
              value={formik.values.newName}
              name="newName"
              ref={inputRef}
              id="newName"
              isInvalid={formik.touched.newName && !!formik.errors.newName}
            />
            <p className="feedback m-0 small text-danger">
              {formik.errors.newName
                && formik.touched.newName
                ? formik.errors.newName : ''}
            </p>
            <div className="d-flex justify-content-end">
              <Button
                onClick={hideModal}
                className="me-2"
                variant="secondary"
              >
                {t('chat.modals.cancel')}
              </Button>
              <Button type="submit" variant="primary">{t('chat.modals.submit')}</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannel;
