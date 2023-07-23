import React from 'react';
import { useTranslation } from 'react-i18next';

import image from '../assets/notFound.svg';

const NotfoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img src={image} alt="Страница не найдена" className="img-fluid h-25" />
      <h1 className="h4 text-muted">{t('notFound.pageNotFound')}</h1>
      <p className="text-muted">
        {t('notFound.visit')}
        <a href="/">{t('notFound.mainPage')}</a>
      </p>
    </div>
  );
};

export default NotfoundPage;
