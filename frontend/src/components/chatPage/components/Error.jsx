import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Error = () => {
  const { t } = useTranslation();

  return (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <h3>{t('error.somethingWentWrong')}</h3>
      <Button 
        as={Link}
        to="/login"
        className="text-start rounded"
        variant="secondary"
      >
        {t('error.refreshPage')}
      </Button>
    </div>
  );
};

export default Error;
