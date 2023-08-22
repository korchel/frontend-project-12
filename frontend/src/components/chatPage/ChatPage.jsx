import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Spinner } from 'react-bootstrap';

import { useAuth } from '../../contexts/authContext/AuthContext.jsx';
import {
  fetchData, getLoadingError, getloadingState,
} from '../../slices/loadingSlice.js';
import Channels from './components/Channels.jsx';
import Messages from './components/Messages.jsx';
import Modal from '../modals/Modal.jsx';
import Error from './components/Error.jsx';
import { openModal } from '../../slices/modalsSlice.js';
import routes from '../../routes.js';

const Chat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hasError, setHasError] = useState(false);

  const loadingError = useSelector(getLoadingError);
  const loadingState = useSelector(getloadingState);

  const { userData, logOut } = useAuth();

  useEffect(() => {
    dispatch(fetchData(userData.token));
  }, [dispatch, userData.token]);

  if (loadingError) {
    if (loadingError.response.status === 401) {
      logOut();
      navigate(routes.loginRoute());
    } else {
      setHasError(true);
    }
  }

  const showModal = (type, id = null) => {
    dispatch(openModal({ type, id }));
  };

  return loadingState === 'loading'
    ? (
      <div className="h-100 d-flex justify-content-center align-items-center">
        <Spinner variant="secondary" />
      </div>
    )
    : (
      <>
        {hasError
          ? <Error />
          : (
            <Container className="h-100 my-4 overflow-hidden rounded shadow">
              <Row className="h-100 bg-white flex-md-row">
                <Channels showModal={showModal} />
                <Messages />
              </Row>
              <Modal />
            </Container>
          )}
      </>
    );
};

export default Chat;
