/* eslint-disable arrow-body-style */
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import avatarImages from '../assets/avatar.jpg';

const signupSchema = Yup.object().shape({
  nickname: Yup.string()
    .min(2, 'Минимум 2 символа')
    .max(50, 'Максимум 50 символов')
    .required('Обязательное поле'),
  password: Yup.string()
    .min(6, 'Минимум 6 символов')
    .max(14, 'Максимум 14 символов')
    .required('Обязательное поле'),
});

const Login = () => {
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
                  nickname: '',
                  password: '',
                }}
                validationSchema={signupSchema}
              >
                {({ errors, touched }) => (
                  <Form className="col-12 col-md-6 mt-3 mt-mb-0">
                    <h1 className="text-center mb-4">Войти</h1>
                    <Field
                      type="text"
                      name="nickname"
                      placeholder="Ваш ник"
                      className="form-control form-floating mb-3"
                    />
                    <p className="feedback m-0 small text-danger">{errors.nickname && touched.nickname ? errors.nickname : ''}</p>
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
