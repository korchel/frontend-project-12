/* eslint-disable */
import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';

import useChatWS from '../../hooks/useChatWS';

const MessagesInput = ({ currentChannelId }) => {
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const { sendMessage } = useChatWS();
  const { username } = JSON.parse(localStorage.getItem('userId'));

  const formik = useFormik({
    initialValues: {message: ''},
    onSubmit: ({message}) => {
      const newMessage = {
        body: message,
        channelId: currentChannelId,
        username,
      };
      sendMessage(newMessage);
    }
  });

  useEffect(() => {
    inputRef.current.focus();
  }, [formik]);

  return (
    <div className="mt-auto px-5 py-3">
      <Form className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
        <InputGroup>
          <Form.Control
            className="border-0 p-0 ps-2"
            type="text"
            name="message"
            placeholder={t('chat.messages.enterMessage')}
            aria-label='Новое сообщение'
            value={formik.values.message}
            onChange={formik.handleChange}
            ref={inputRef}
          />
            <Button type="submit" variant="link" className="btn-group-vertical text-dark">
              <ArrowRightSquare size={20} />
            </Button>
        </InputGroup>
      </Form>
    </div>
  )
};

export default MessagesInput;
