/* eslint-disable */
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Formik, Form, Field, ErrorMessage
} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
  Container, Row, Col, Card, Image,
} from 'react-bootstrap';

import avatarImages from '../assets/avatar_1.jpg';
import routes from '../routes.js';
import useAuth from '../hooks/useAuth.js';

const signupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Минимум 3 символа')
    .max(20, 'Максимум 20 символов')
    .required('Обязательное поле'),
  password: Yup.string()
    .min(6, 'Минимум 6 символов')
    .max(14, 'Максимум 14 символов')
    .required('Обязательное поле'),
});

const SignupPage = () => {
  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col md={6} xs={12} className="d-flex align-items-center justify-content-center">
                <Image src={avatarImages} alt="#" className="rounded-circle" />
              </Col>
              <Formik
                initialValues={{
                  username: '',
                  password: '',
                }}
                onSubmit={({ username, password }, actions) => {
                  setauthFailed(false);
                  axios.post(routes.loginPath(), {
                    username,
                    password,
                  })
                    .then((responce) => {
                      localStorage.setItem('userId', JSON.stringify(responce.data));
                      auth.logIn();
                      navigate('/');
                    })
                    .catch((error) => {
                      actions.setSubmitting(false);
                      if (error.isAxiosError && error.response.status === 401) {
                        setauthFailed(true);
                        return;
                      }
                      return;
                    });
                }}
                validationSchema={signupSchema}
              >
                {({ errors, touched }) => (
                  <Form className="col-12 col-md-6 mt-3 mt-mb-0">
                    <h1 className="text-center mb-4">Регистрация</h1>
                    <Field
                      type="text"
                      name="username"
                      placeholder="Имя пользователя"
                      className="form-control form-floating mb-3"
                    />
                    <ErrorMessage name="username" component="p" className="feedback m-0 small text-danger" />
                    <Field
                      type="password"
                      name="password"
                      className="form-control form-floating mb-3"
                      placeholder="Пароль"
                    />
                    <ErrorMessage name="password" component="p" className="feedback m-0 small text-danger" />
                    <Field
                      type="password"
                      name="passford confirmation"
                      className="form-control form-floating mb-3"
                      placeholder="Подтвердите пароль"
                    />
                    <button type="submit" className="btn btn-outline-primary w-100 mb-3">Зарегестрироваться</button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;