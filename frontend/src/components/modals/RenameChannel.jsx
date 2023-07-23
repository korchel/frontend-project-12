/* eslint-disable functional/no-expression-statements */
/* eslint-disable functional/no-conditional-statements */
import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Modal, Form, Button, FormControl,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import useChatWS from '../../hooks/useChatWS.js';
import { selectors } from '../../slices/channelsSlice.js';
import { closeModal } from '../../slices/modalsSlice.js';

const RenameChannel = () => {
  const { t } = useTranslation();
  const { renameChannel } = useChatWS();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const channels = useSelector(selectors.selectAll).map((channel) => channel.name);
  const renamedChannelId = useSelector((state) => state.modalsReducer.channelId);

  const notify = (status) => {
    if (status === 'ok') {
      toast.success(t('chat.modals.channelRenamed'));
    }
    if (status !== 'ok') {
      toast.warning(t('chat.modals.channelNotRenamed'));
    }
  };

  const getValidationSchema = () => Yup.object().shape({
    newName: Yup.string()
      .required()
      .min(3, t('chat.modals.nameLength'))
      .max(15, t('chat.modals.nameLength'))
      .notOneOf(channels, t('chat.modals.nameExists')),
  });

  const formik = useFormik({
    initialValues: { newName: '' },
    onSubmit: ({ newName }) => {
      renameChannel(newName, renamedChannelId, notify);
      dispatch(closeModal());
    },
    validationSchema: getValidationSchema(channels),
  });

  const hideModal = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal show onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('chat.modals.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <FormControl
              className="mb-2"
              onChange={formik.handleChange}
              value={formik.values.newName}
              name="newName"
              ref={inputRef}
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
