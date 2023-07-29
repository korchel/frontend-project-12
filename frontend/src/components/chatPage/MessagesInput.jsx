/* eslint-disable functional/no-expression-statements */
/* eslint-disable */
import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';

import useChatWS from '../../hooks/useChatWS';

const MessagesInput = ({ currentChannelId }) => {
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const { sendMessage } = useChatWS();
  const { username } = JSON.parse(localStorage.getItem('userId'));

  const formik = useFormik({
    initialValues: { message: '' },
    onSubmit: ({ message }, actions) => {
      const filteredMessage = leoProfanity.clean(message);
      const newMessage = {
        body: filteredMessage,
        channelId: currentChannelId,
        username,
      };
      sendMessage(newMessage);
      actions.resetForm();
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, [formik]);

  return (
    <div className="mt-auto px-5 py-3">
      <Form className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
        <InputGroup>
          <label style={{ display: 'none' }} htmlFor="message">{t('chat.messages.newMessage')}</label>
          <Form.Control
            className="border-0 p-0 ps-2"
            type="text"
            name="message"
            placeholder={t('chat.messages.enterMessage')}
            id="message"
            value={formik.values.message}
            onChange={formik.handleChange}
            ref={inputRef}
          />
          <Button
            type="submit"
            variant="link"
            className="btn-group-vertical text-dark"
          >
            <ArrowRightSquare size={20} />
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default MessagesInput;
