import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const LoginButton = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  return (
    pathname === '/signup' && (
      <Button as={Link} to="/login">
        {t('header.login')}
      </Button>
    )
  );
};

export default LoginButton;
