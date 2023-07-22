/* eslint-disable */
import React from 'react';

import image from '../assets/notFound.svg';

const NotfoundPage = () => (
  <div className="text-center">
    <img src={image} alt="Страница не найдена" className="img-fluid h-25"/>
    <h1 className="h4 text-muted">Страница не найдена</h1>
    <p className="text-muted">Но вы можете перейти <a href="/">на главную сраницу</a></p>
  </div>
);

export default NotfoundPage;
