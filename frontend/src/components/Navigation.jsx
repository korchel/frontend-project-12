/* eslint-disable */
import React from 'react';
import { Button, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

const LogOutButton = () => {
  const auth = useAuth();
  console.log(auth.loggedIn)
  return (
    auth.loggedIn && (
      <Button as={Link} to="/login" onClick={auth.logOut}>
        Log out
      </Button>
    )
  );
};

const Navigation = () => {
  return (
    <Navbar bg="wight" expand="lg" className="shadow-sm">
      <Navbar.Brand>Hexlet Chat</Navbar.Brand>
      <LogOutButton />
    </Navbar>
)
};

export default Navigation;