import React from 'react';
import { Navbar, Container, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import LogOutButton from './components/LogoutButton';
import LoginButton from './components/LoginButton';
import LanguageButton from './components/LanguageButton';

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
