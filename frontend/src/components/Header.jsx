/* eslint-disable */
import React from 'react';
import { Button, Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import useAuth from '../hooks/useAuth';

const LogOutButton = () => {
  const auth = useAuth();
  const { t } = useTranslation();

  return (
    auth.loggedIn && (
      <Button as={Link} to="/login" onClick={auth.logOut}>
        {t('header.logout')}
      </Button>
    )
  );
};

const Header = () => {
  return (
    <Navbar bg="wight" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
        <LogOutButton />
      </Container>
    </Navbar>
)
};

export default Header;