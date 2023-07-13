import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import s from './RegisterForm.module.scss';
import { InputForm } from '../../UI/InputForm/InputForm';
import { Link } from 'react-router-dom';
import { ButtonForm } from './../../UI/ButtonForm/ButtonForm';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { validateField, validationForm } from '../../../utils/helpers/validations';
import { registerUser } from '../../../redux/Slices/authSlice';
import { useAppDispatch } from '../../../hooks/reduxHooks';
const SignScheme = Yup.object().shape({
  email: validationForm.email,
  fullName: validationForm.fullName,
  password: validationForm.password,
  repeatedPassword: validationForm.passwordConfirm,
});
export const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const ddd = true;
  const initialValues = {
    email: '',
    fullName: '',
    password: '',
    repeatedPassword: '',
  };
  const formik = useFormik({
    initialValues,
    validationSchema: SignScheme,
    onSubmit: async (values) => {
      const { repeatedPassword, ...postData } = values;
      await dispatch(registerUser(postData));
    },
  });

  return (
    <div className={s.register}>
      <div className={s.register_info}>
        <h1>Войти в аккаунт</h1>
        <h3>Пожалуйста, войди в свой аккаунт</h3>
      </div>
      <div className={s.register_block}>
        {ddd ? (
          <>
            <form className={s.register_form} onSubmit={formik.handleSubmit}>
              <div>
                <InputForm
                  required
                  onBlur={formik.handleBlur}
                  name="email"
                  placeholder="Введите email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  classNames={['gerger', 'gregfre']}
                  status={validateField(formik.errors.email, formik.touched.email)}
                />
                <p className={s.errorMessage}>{formik.touched.email && formik.errors.email}</p>
              </div>
              <div>
                <InputForm
                  required
                  name="fullName"
                  placeholder="Введите имя"
                  onChange={formik.handleChange}
                  value={formik.values.fullName}
                  onBlur={formik.handleBlur}
                  classNames={['gerger', 'gregfre']}
                  status={validateField(formik.errors.fullName, formik.touched.fullName)}
                />
                <p className={s.errorMessage}>
                  {formik.touched.fullName && formik.errors.fullName}
                </p>
              </div>
              <div>
                <InputForm
                  required
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  placeholder="Введите пароль"
                  classNames={['gerger', 'gregfre']}
                  onBlur={formik.handleBlur}
                  status={validateField(formik.errors.password, formik.touched.password)}
                />
                <p className={s.errorMessage}>
                  {formik.touched.password && formik.errors.password}
                </p>
              </div>
              <div>
                <InputForm
                  required
                  name="repeatedPassword"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.repeatedPassword}
                  placeholder="Повторите пароль"
                  classNames={['gerger', 'gregfre']}
                  status={validateField(
                    formik.errors.repeatedPassword,
                    formik.touched.repeatedPassword,
                  )}
                />
                <p className={s.errorMessage}>
                  {formik.touched.repeatedPassword && formik.errors.repeatedPassword}
                </p>
              </div>
              <ButtonForm
                disabled={!formik.isValid || formik.isSubmitting}
                classNames={[s.register_form_submit]}
                type="submit">
                Зарегистрироваться
              </ButtonForm>
            </form>
            <Link className={s.login_link} to="/login">
              Войти в аккаунт
            </Link>
          </>
        ) : (
          <div className={s.register_confirm}>
            <AiOutlineInfoCircle className={s.register_infoImg} />
            <h2>Подтвердите свой аккаунт</h2>
            <p>На вашу почту отправлено письмо с ссылкой на подтверждение аккаунта</p>
          </div>
        )}
      </div>
    </div>
  );
};
