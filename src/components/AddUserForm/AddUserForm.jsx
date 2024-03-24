import { useState } from 'react';
import UserForm from '../UserForm/UserForm.jsx';
import Input from '../Input/Input.jsx';
import OpenEyeIcon from '../../images/eye-open.svg';
import CloseEyeIcon from '../../images/eye-close.svg';
import { addNewEmployee } from '../../utils/mainApi.js';
import { useFormValidation } from '../../hooks/useFormValidation.js';
import { handleChangeInput, VALIDATION_MESSAGES, isValidEmail, isValidJobTitle, isValidName, isValidPassword } from '../../utils/validationConstants.js';
import './AddUserForm.scss';

function AddUserForm({ setIsAddEmployeePopupOpen }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { values, handleChange, errors, setErrors, isValid } =
  useFormValidation({
    name: '',
    position: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleRegisterEmployee = (e) => {
    e.preventDefault();
    const { name, position, email } = values;
    console.log('values', values);
    addNewEmployee({ fullName: name, position, email }).then((res) => {
      alert('res in add new user', res);
      alert('You have successfully added new employee');
      setIsAddEmployeePopupOpen(false);
    });
  };

  return (
    <section className="addUserForm">
      <UserForm formTitle='Регистрация сотрудника' handleSubmit={handleRegisterEmployee} isValid={isValid}>
      <Input
            type="text"
            name="name"
            value={values.name}
            // eslint-disable-next-line max-len
            onChange={(e) => handleChangeInput(e, handleChange, errors, setErrors, VALIDATION_MESSAGES.invalidName, isValidName)}
            error={errors.name}
            inputClassName="userForm__input"
            placeholder="Имя Фамилия"
            spanClassName="userForm__span"
            required={true}
          />
          <Input
            type="text"
            name="jobTitle"
            value={values.position}
            // eslint-disable-next-line max-len
            onChange={(e) => handleChangeInput(e, handleChange, errors, setErrors, VALIDATION_MESSAGES.invalidJobTitle, isValidJobTitle)}
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
            // eslint-disable-next-line max-len
            onChange={(e) => handleChangeInput(e, handleChange, errors, setErrors, VALIDATION_MESSAGES.invalidEmail, isValidEmail)}
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
                // eslint-disable-next-line max-len
                onChange={(e) => handleChangeInput(e, handleChange, errors, setErrors, VALIDATION_MESSAGES.invalidPassword, isValidPassword)}
                placeholder='Пароль авторизации'
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
                // eslint-disable-next-line max-len
                onChange={(e) => handleChangeInput(e, handleChange, errors, setErrors, VALIDATION_MESSAGES.invalidPassword, isValidPassword)}
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
