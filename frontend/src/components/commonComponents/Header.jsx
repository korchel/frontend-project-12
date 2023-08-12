import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import LogOutButton from './LogoutButton.jsx';
import LoginButton from './LoginButton.jsx';

const Header = () => (
  <Navbar bg="wight" expand="lg" className="shadow-sm">
    <Container>
      <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
      <LogOutButton />
      <LoginButton />
    </Container>
  </Navbar>
);

export default Header;
