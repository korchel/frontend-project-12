import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
  Container, Row, Col, Card, Image,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import image from '../../assets/signup.jpg';
import routes from '../../routes.js';
import { useAuth } from '../../contexts/authContext/AuthContext.jsx';

const SignupPage = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const navigate = useNavigate();
  const auth = useAuth();
  const [signupFailed, setSignupFailed] = useState(false);

  useEffect(() => {
    ref.current.focus();
  }, []);

  const signupSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'signup.usernameLength')
      .max(20, 'signup.usernameLength')
      .required('signup.requiredField'),
    password: Yup.string()
      .min(6, 'signup.passwordLength')
      .required('signup.requiredField'),
    passwordConfirm: Yup.string()
      .required('signup.requiredField')
      .oneOf([Yup.ref('password')], 'signup.passwordsMatch'),
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
                  passwordConfirmation: '',
                }}
                onSubmit={({ username, password }, actions) => {
                  setSignupFailed(false);
                  axios.post(routes.signupPath(), {
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
                      if (error.isAxiosError && error.response.status === 409) {
                        setSignupFailed(true);
                      }
                    });
                }}
                validationSchema={signupSchema}
              >
                <Form className="col-12 col-md-6 mt-3 mt-mb-0">
                  <h1 className="text-center mb-4">{t('signup.registration')}</h1>
                  <label style={{ display: 'none' }} htmlFor="username">{t('signup.username')}</label>
                  <Field
                    type="text"
                    name="username"
                    placeholder={t('signup.username')}
                    className="form-control form-floating mb-3"
                    innerRef={ref}
                    id="username"
                  />
                  <ErrorMessage
                    name="username"
                    render={(error) => (
                      <p className="small text-danger">{t(error)}</p>
                    )}
                  />
                  <label style={{ display: 'none' }} htmlFor="password">{t('signup.password')}</label>
                  <Field
                    type="password"
                    name="password"
                    className="form-control form-floating mb-3"
                    placeholder={t('signup.password')}
                    id="password"
                  />
                  <ErrorMessage
                    name="password"
                    render={(error) => (
                      <p className="small text-danger">{t(error)}</p>
                    )}
                  />
                  <label style={{ display: 'none' }} htmlFor="passwordConfirm">{t('signup.passwordConfirm')}</label>
                  <Field
                    type="password"
                    name="passwordConfirm"
                    className="form-control form-floating mb-3"
                    placeholder={t('signup.passwordConfirm')}
                    id="passwordConfirm"
                  />
                  <ErrorMessage 
                    name="passwordConfirm"
                    render={(error) => (
                      <p className="small text-danger">{t(error)}</p>
                    )}
                  />
                  {signupFailed
                    && (
                      <p className="feedback m-0 small text-danger">
                        {t('signup.userExists')}
                      </p>
                    )}
                  <button
                    type="submit"
                    className="btn btn-outline-primary w-100 mb-3"
                  >
                    {t('signup.signup')}
                  </button>
                </Form>
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;
