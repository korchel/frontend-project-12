/* eslint-disable no-useless-return */
/* eslint-disable functional/no-expression-statements */
/* eslint-disable arrow-body-style */
import React from 'react';
import {
  Formik, Form, Field,
} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import avatarImages from '../assets/avatar.jpg';
import routes from '../routes.js';
import useAuth from '../hooks/index.js';

const signupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Минимум 2 символа')
    .max(50, 'Максимум 50 символов')
    .required('Обязательное поле'),
  password: Yup.string()
    .min(5, 'Минимум 5 символов')
    .max(14, 'Максимум 14 символов')
    .required('Обязательное поле'),
});

const Login = () => {
  const authorization = useAuth();

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={avatarImages} alt="#" className="rounded-circle" />
              </div>
              <Formik
                initialValues={{
                  username: '',
                  password: '',
                }}
                onSubmit={({ username, password }, actions) => {
                  axios.post(routes.loginPath(), {
                    username,
                    password,
                  })
                    .then((responce) => {
                      localStorage.setItem('userId', JSON.stringify(responce.data));
                      console.log(responce);
                      authorization.logIn();
                    })
                    .catch((error) => {
                      console.log(error);
                      actions.setSubmitting(false);
                      if (error.isAxiosError && error.response.status === 401) {
                        console.log('boom');
                        return;
                      }
                      return;
                    });
                }}
                validationSchema={signupSchema}
              >
                {({ errors, touched }) => (
                  <Form className="col-12 col-md-6 mt-3 mt-mb-0">
                    <h1 className="text-center mb-4">Войти</h1>
                    <Field
                      type="text"
                      name="username"
                      placeholder="Ваш ник"
                      className="form-control form-floating mb-3"
                    />
                    <p className="feedback m-0 small text-danger">{errors.username && touched.username ? errors.username : ''}</p>
                    <Field
                      type="password"
                      name="password"
                      className="form-control form-floating mb-3"
                      placeholder="Пароль"
                    />
                    <p className="feedback m-0 small text-danger">{errors.password && touched.password ? errors.password : ''}</p>
                    <button type="submit" className="btn btn-outline-primary w-100 mb-3">Войти</button>
                  </Form>
                )}
              </Formik>
              <div className="card-footer p-4">
                <div className="text-center">
                  Нет аккаунта? Регистрация
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
