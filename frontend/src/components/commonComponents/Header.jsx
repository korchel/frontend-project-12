import React from 'react';
import { Navbar, Container, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import LogOutButton from './LogoutButton.jsx';
import LoginButton from './LoginButton.jsx';
import LanguageButton from './LanguageButton.jsx';

const Header = () => (
  <Navbar bg="wight" expand="lg" className="shadow-sm">
    <Container>
      <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
      <ButtonGroup>
        <LanguageButton />
        <LogOutButton />
        <LoginButton />
      </ButtonGroup>
    </Container>
  </Navbar>
);

export default Header;
