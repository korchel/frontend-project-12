import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const MainPage = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to='/login'>login page</Link>
          </li>
        </ul>
      </nav>
      <hr />
      <Outlet />
    </>
  )
};

export default MainPage;