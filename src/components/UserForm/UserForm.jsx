import { useState } from 'react';
import OpenEyeIcon from '../../images/eye-open.svg';
import CloseEyeIcon from '../../images/eye-close.svg';
import Input from '../Input/Input.jsx';
import { useFormValidation } from '../../hooks/useFormValidation.js';
import { isValidEmail, isValidJobTitle, isValidName, isValidPassword, VALIDATION_MESSAGES, handleChangeInput } from '../../utils/validationConstants.js';
import './UserForm.scss';

function UserForm({ formTitle, handleSubmit, passwordPlaceholder }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { values, handleChange, errors, setErrors, isValid } =
  useFormValidation({
    name: '',
    jobTitle: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  return (
    <div className="userForm__wrapper">
      <h3 className="userForm__title">{formTitle}</h3>
      <form className="userForm__form" onSubmit={handleSubmit}>
        <fieldset className="userForm__fieldset">
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
            value={values.jobTitle}
            // eslint-disable-next-line max-len
            onChange={(e) => handleChangeInput(e, handleChange, errors, setErrors, VALIDATION_MESSAGES.invalidJobTitle, isValidJobTitle)}
            error={errors.jobTitle}
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
                placeholder={passwordPlaceholder}
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
        </fieldset>
        <button type='submit' className='userForm__submit-button' disable={!isValid}>Подтвердить</button>
      </form>
    </div>
  );
}

export default UserForm;
