/* eslint-disable */

import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Modal, Form, Button, FormControl,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import useChatWS from '../../hooks/useChatWS.js';
import { selectors } from '../../slices/channelsSlice.js';
import { closeModal } from '../../slices/modalsSlice.js';

const getValidationSchema = (channels) => Yup.object().shape({
  newName: Yup.string()
    .required()
    .min(3, 'Минимум 3 символа')
    .max(15, 'Минимум 15 символов')
    .notOneOf(channels, 'Имя уже существует'),
});

const RenameChannel = () => {
  const { renameChannel } = useChatWS();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const channels = useSelector(selectors.selectAll).map((channel) => channel.name);
  console.log(channels)
  const renamedChannelId = useSelector((state) => state.modalsReducer.channelId);

  const formik = useFormik({
    initialValues: {newName: ''},
    onSubmit: ({ newName }) => {
      renameChannel(newName, renamedChannelId);
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
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <FormControl
              className="mb-2"
              onChange={formik.handleChange}
              value={formik.values.newName}
              name='newName'
              ref={inputRef}
            />
            <p className="feedback m-0 small text-danger">{formik.errors.newName && formik.touched.newName ? formik.errors.newName : ''}</p>
            <div className="d-flex justify-content-end">
              <Button onClick={hideModal} className="me-2" variant="secondary">Отменить</Button>
              <Button type="submit" variant="primary">Отправить</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannel;