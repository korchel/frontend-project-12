/* eslint-disable functional/no-conditional-statements */
/* eslint-disable functional/no-expression-statements */
/* eslint-disable no-useless-return */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import routes from '../routes.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const MainPage = () => {
  const [content, setContent] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(routes.usersPath(), { headers: getAuthHeader() })
      .then((responce) => {
        setContent(responce.data);
        console.log(responce.data);
      })
      .catch((error) => {
        if (error.isAxiosError && error.response.status === 401) {
          navigate('/login');
          return;
        }
        return;
      });
  }, [navigate]);
  return (
    content && <div><p>content</p></div>
  );
};

export default MainPage;
