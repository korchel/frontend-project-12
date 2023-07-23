/* eslint-disable */
import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Modal, Form, Button, FormControl,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import useChatWS from '../../hooks/useChatWS.js';
import { selectors } from '../../slices/channelsSlice.js';
import { closeModal } from '../../slices/modalsSlice.js';

const AddChannel = () => {
  const inputRef = useRef();
  const { t } = useTranslation();
  const { addChannel } = useChatWS();
  const dispatch = useDispatch();
  const channels = useSelector(selectors.selectAll).map((channel) => channel.name);

  const getValidationSchema = () => Yup.object().shape({
    newChannelsName: Yup.string()
      .required()
      .min(3, 'Минимум 3 символа')
      .max(15, 'Минимум 15 символов')
      .notOneOf(channels, 'Имя уже существует'),
  });

  const formik = useFormik({
    initialValues: { newChannelsName: '' },
    onSubmit: ({ newChannelsName }) => {
      const newChannel = {
        name: newChannelsName,
      };
      addChannel(newChannel);
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
        <Modal.Title>{t('chat.modals.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <FormControl
              className="mb-2"
              onChange={formik.handleChange}
              value={formik.values.newChannelsName}
              name="newChannelsName"
              ref={inputRef}
            />
            <p className="feedback m-0 small text-danger">{formik.errors.newChannelsName && formik.touched.newChannelsName ? formik.errors.newChannelsName : ''}</p>
            <div className="d-flex justify-content-end">
              <Button onClick={hideModal} className="me-2" variant="secondary">{t('chat.modals.cancel')}</Button>
              <Button type="submit" variant="primary">{t('chat.modals.submit')}</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
