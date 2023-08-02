import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
  Container, Row, Col, Card, Image,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import image from '../assets/login.jpg';
import routes from '../routes.js';
import useAuth from '../hooks/useAuth';

const LoginPage = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const auth = useAuth();
  const navigate = useNavigate();
  const [authFailed, setauthFailed] = useState(false);

  useEffect(() => {
    ref.current.focus();
  }, []);

  const loginSchema = Yup.object().shape({
    username: Yup.string()
      .required(t('login.requiredField')),
    password: Yup.string()
      .required(t('login.requiredField')),
  });

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col md={6} xs={12} className="d-flex align-items-center justify-content-center">
                <Image src={image} alt="#" className="rounded-circle" />
              </Col>
              <Formik
                initialValues={{
                  username: '',
                  password: '',
                }}
                validateOnBlur={false}
                onSubmit={({ username, password }, actions) => {
                  setauthFailed(false);
                  axios.post(routes.loginPath(), {
                    username,
                    password,
                  })
                    .then((response) => {
                      localStorage.setItem('userId', JSON.stringify(response.data));

                      auth.logIn();
                      navigate('/');
                    })
                    .catch((error) => {
                      actions.setSubmitting(false);
                      if (error.isAxiosError && error.response.status === 401) {
                        setauthFailed(true);
                      }
                    });
                }}
                validationSchema={loginSchema}
              >
                <Form className="col-12 col-md-6 mt-3 mt-mb-0">
                  <h1 className="text-center mb-4">{t('login.signin')}</h1>
                  <label style={{ display: 'none' }} htmlFor="username">{t('login.username')}</label>
                  <Field
                    type="text"
                    name="username"
                    placeholder={t('login.username')}
                    className="form-control form-floating mb-3"
                    innerRef={ref}
                    id="username"
                  />
                  {/* пока не знаю, что делать с ErrorMessage, из-за них не проходят тесты */}
                  <ErrorMessage name="username" component="p" className="feedback m-0 small text-danger" />
                  <label style={{ display: 'none' }} htmlFor="password">{t('login.password')}</label>
                  <Field
                    type="password"
                    name="password"
                    placeholder={t('login.password')}
                    className="form-control form-floating mb-3"
                    id="password"
                  />
                  <ErrorMessage name="password" component="p" className="feedback m-0 small text-danger" />
                  {authFailed
                    && (
                      <p className="feedback m-0 small text-danger">
                        {t('login.wrongUsernameAndPassword')}
                      </p>
                    )}
                  <button type="submit" className="btn btn-outline-primary w-100 mb-3">{t('login.signin')}</button>
                </Form>
              </Formik>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span className="px-1">{t('login.noAccountYet')}</span>
                <Link to="/signup">{t('login.signup')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
