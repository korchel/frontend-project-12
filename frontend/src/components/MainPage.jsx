/* eslint-disable functional/no-conditional-statements */
/* eslint-disable functional/no-expression-statements */
import React, { useEffect } from 'react';
// import axios from 'axios';
import { Link, Outlet } from 'react-router-dom';
// import routes from '../routes.js';

const MainPage = () => {
  // const [content, setContent] = useState();
  // const navigate = useNavigate();

  useEffect(() => {
    const userId = JSON.parse(window.localStorage.getItem('userId'));
    if (!userId || !userId.token) {
      console.log('no token');
    } else {
      console.log(userId.token);
    }
  }, []);
  return (
    <>
      <Link to="/login">login page</Link>
      <Outlet />
    </>
  );
};

export default MainPage;
