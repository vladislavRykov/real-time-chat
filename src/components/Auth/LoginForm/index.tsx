import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import s from './LoginForm.module.scss';
import { InputForm } from '../../UI/InputForm/InputForm';
import { Link } from 'react-router-dom';
import { ButtonForm } from './../../UI/ButtonForm/ButtonForm';
import { validateField, validationForm } from '../../../utils/helpers/validations';
import { loginUser } from '../../../redux/Slices/authSlice';
import { useAppDispatch } from '../../../hooks/reduxHooks';
const SignScheme = Yup.object().shape({
  email: validationForm.email,
  password: validationForm.password,
});
export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const initialValues = {
    email: '',
    password: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: SignScheme,
    onSubmit: async (values) => {
      dispatch(loginUser(values))
        .unwrap()
        .then((goodRes) => {
          formik.setStatus('');
        })
        .catch((badRes) => {
          formik.setStatus(badRes.errorMessage);
        });
    },
  });
  return (
    <div className={s.login}>
      <div className={s.login_info}>
        <h1>Войти в аккаунт</h1>
        <h3>Пожалуйста, войди в свой аккаунт</h3>
      </div>
      <div className={s.login_block}>
        <form className={s.login_form} onSubmit={formik.handleSubmit}>
          <div>
            <InputForm
              required
              name="email"
              placeholder="Введите email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              classNames={['gerger', 'gregfre']}
              status={validateField(formik.errors.email, formik.touched.email)}
            />
            <p className={s.errorMessage}>{formik.touched.email && formik.errors.email}</p>
          </div>
          <div>
            <InputForm
              required
              name="password"
              type="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              placeholder="Введите пароль"
              classNames={['gerger', 'gregfre']}
              status={validateField(formik.errors.password, formik.touched.password)}
            />
            <p className={s.errorMessage}>{formik.touched.password && formik.errors.password}</p>
          </div>
          <p className={s.apiError}>{formik.status}</p>
          <ButtonForm
            onClick={() => console.log(formik.isSubmitting)}
            disabled={formik.isSubmitting}
            classNames={[s.login_form_submit]}
            type={'submit'}>
            Войти в аккаунт
          </ButtonForm>
          <button disabled={formik.isSubmitting}>GREGRE</button>
        </form>
        <Link className={s.registration_link} to="/register">
          Зарегистрироваться
        </Link>
      </div>
    </div>
  );
};
