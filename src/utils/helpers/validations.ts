import * as Yup from 'yup';
import { InputStatues } from '../../components/UI/InputForm/InputForm';
export const validationForm = {
  email: Yup.string().email('Невалидный email').required('Обязательное поле'),
  fullName: Yup.string().required('Обязательное поле').min(2, 'Введите корректное имя'),
  password: Yup.string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  passwordConfirm: Yup.string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
};
export const validateField = (
  error: string | undefined,
  touched: boolean | undefined,
): InputStatues => {
  if (error && touched) {
    return InputStatues.error;
  } else if (!error && touched) {
    return InputStatues.ok;
  } else {
    return InputStatues.default;
  }
};
