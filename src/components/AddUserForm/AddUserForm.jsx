import { useState, useEffect } from 'react';
import UserForm from '../UserForm/UserForm.jsx';
import Input from '../Input/Input.jsx';
import OpenEyeIcon from '../../images/eye-open.svg';
import CloseEyeIcon from '../../images/eye-close.svg';
import { addNewEmployee } from '../../utils/mainApi.js';
import { useFormValidation } from '../../hooks/useFormValidation.js';
import {
  handleChangeInput,
  VALIDATION_MESSAGES,
  isValidEmail,
  isValidJobTitle,
  isValidName,
  isValidPassword,
} from '../../utils/validationConstants.js';
import './AddUserForm.scss';

function AddUserForm({ setIsAddEmployeePopupOpen }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { values, handleChange, errors, setErrors, isValid, setIsValid } =
    useFormValidation({
      name: '',
      position: '',
      email: '',
      password: '',
      confirmPassword: '',
    });

  useEffect(() => {
    const hasErrors =
      errors.email ||
      errors.password ||
      errors.confirmPassword ||
      errors.position;

    const hasValues =
      !values.name ||
      !values.position ||
      !values.email ||
      !values.password ||
      !values.confirmPassword;

    if (hasErrors || hasValues) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [errors]);

  useEffect(() => {
    if (values.confirmPassword !== values.password) {
      setErrors({ confirmPassword: VALIDATION_MESSAGES.passwordsNotMatch });
    }
  }, [values.confirmPassword]);

  const registerEmployee = (e) => {
    e.preventDefault();
    const { name, position, email, password } = values;
    const { token } = JSON.parse(localStorage.getItem('token'));
    addNewEmployee({ token, fullName: name, position, email, password }).then(
      () => {
        setIsAddEmployeePopupOpen(false);
      }
    );
  };

  const handleCloseAddEmployeePopup = () => {
    setIsAddEmployeePopupOpen(false);
  };

  return (
    <section className="addUserForm">
      <UserForm
        formTitle="Регистрация сотрудника"
        handleSubmit={registerEmployee}
        isValid={isValid}
        handleClosePopup = { handleCloseAddEmployeePopup }
      >
        <Input
          type="text"
          name="name"
          value={values.name}
          onChange={(e) =>
            handleChangeInput(
              e,
              handleChange,
              errors,
              setErrors,
              VALIDATION_MESSAGES.invalidNameOrPosition,
              isValidName
            )
          }
          error={errors.name}
          inputClassName="userForm__input"
          placeholder="Имя Фамилия"
          spanClassName="userForm__span"
          required={true}
        />
        <Input
          type="text"
          name="position"
          value={values.position}
          onChange={(e) =>
            handleChangeInput(
              e,
              handleChange,
              errors,
              setErrors,
              VALIDATION_MESSAGES.invalidNameOrPosition,
              isValidJobTitle
            )
          }
          error={errors.position}
          inputClassName="userForm__input"
          placeholder="Должность"
          spanClassName="userForm__span"
          required={true}
        />
        <Input
          type="email"
          name="email"
          value={values.email}
          onChange={(e) =>
            handleChangeInput(
              e,
              handleChange,
              errors,
              setErrors,
              VALIDATION_MESSAGES.invalidEmail,
              isValidEmail
            )
          }
          error={errors.email}
          inputClassName="userForm__input"
          placeholder="Email"
          spanClassName="userForm__span"
          required={true}
        />
        <>
          <div className="userForm__passwordField">
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              inputClassName="userForm__input"
              value={values.password}
              onChange={(e) =>
                handleChangeInput(
                  e,
                  handleChange,
                  errors,
                  setErrors,
                  VALIDATION_MESSAGES.invalidPassword,
                  isValidPassword
                )
              }
              placeholder="Пароль авторизации"
              spanClassName="userForm__span"
              error={errors.password}
              required={true}
            />
            <button
              type="button"
              className="userForm__togglePasswordButton"
              onClick={() => setShowPassword(!showPassword)}
            >
              <img
                src={showPassword ? OpenEyeIcon : CloseEyeIcon}
                alt="иконка показа пароля"
              />
            </button>
          </div>
        </>
        <>
          <div className="userForm__passwordField">
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              inputClassName="userForm__input"
              value={values.confirmPassword}
              onChange={(e) =>
                handleChangeInput(
                  e,
                  handleChange,
                  errors,
                  setErrors,
                  VALIDATION_MESSAGES.invalidPassword,
                  isValidPassword
                )
              }
              placeholder="Подтвердите пароль"
              autoComplete="off"
              spanClassName="userForm__span"
              error={errors.confirmPassword}
              required={true}
            />
            <button
              type="button"
              className="userForm__togglePasswordButton"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <img
                src={showConfirmPassword ? OpenEyeIcon : CloseEyeIcon}
                alt="иконка показа пароля"
              />
            </button>
          </div>
        </>
      </UserForm>
    </section>
  );
}

export default AddUserForm;
