import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../store/slices/userSlice.js';
import { useFormValidation } from '../../hooks/useFormValidation.js';
import { ENDPOINT_ROUTES } from '../../constants/constantsEndpointRoute.js';
import { updateAdminData } from '../../utils/mainApi.js';
import './PersonalAreaForm.scss';

function PersonalAreaForm({ handleError }) {
  const { personalAreaEditing } = ENDPOINT_ROUTES;
  const [editing, setEditing] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isDisabledButton, setIsDisabledButton] = useState(false);
  const { errors, values, isValid, handleChange } = useFormValidation();
  const { pathname } = useLocation();
  const admin = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    pathname === personalAreaEditing ? setEditing(true) : setEditing(false);
  }, [pathname])

  useEffect(() => {
    if (checkPassword()) {
      setIsDisabledButton(false);
    } else {
      setIsDisabledButton(true);
    }
  }, [values.newPassword, values.repeatPassword]);

  if (!values.name && !editing) {
    values.name = admin.fullName;
    values.email = admin.email;
    values.job = admin.position || 'Руководитель';
    values.repeatPassword = '';
    values.newPassword = '';
  }

  function handleEditing() {
    navigate(personalAreaEditing);
  }

  function checkPassword() {
    return values.repeatPassword === values.newPassword;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newUserData = {
      fullName: values.name || null,
      position: values.job || null,
      email: values.email || null,
    };

    const newUserDataForServer = {
      ...newUserData,
      password: values.repeatPassword || null,
    };

    updateAdminData(admin.id, newUserDataForServer)
      .then(() => {
        setEditing(false);
        dispatch(setUser({ ...admin, ...newUserData }));
        values.repeatPassword = '';
        values.newPassword = '';
      })
      .catch((err) => handleError(err));
  }

  function handlePasswordVisibility() {
    setPasswordVisible(!passwordVisible);
  }

  return (
    <form className="personal-area-form" onSubmit={handleSubmit}>
      <h2 className="personal-area-form__title">
        {editing ? 'Редактирование' : 'Личные данные'}
      </h2>
      <input
        className={`personal-area-form__input ${errors.name ? 'personal-area-form__input_type-error' : ''}`}
        type="text"
        id="name"
        minLength="1"
        maxLength="255"
        name="name"
        value={values.name || ''}
        onChange={handleChange}
        placeholder="Имя Фамилия"
        pattern="^[а-яА-Яa-zA-Z\s\-]+$"
        disabled={!editing}
        required
      />
      <span className="personal-area-form__input-error">{errors.name}</span>
      <input
        className={`personal-area-form__input ${errors.job ? 'personal-area-form__input_type-error' : ''}`}
        type="text"
        id="job"
        minLength="1"
        maxLength="255"
        name="job"
        value={values.job || ''}
        onChange={handleChange}
        placeholder="Должность"
        pattern="^[а-яА-Яa-zA-Z\s\-]+$"
        disabled={!editing}
        required
      />
      <span className="personal-area-form__input-error">{errors.job}</span>
      <input
        className={`personal-area-form__input ${errors.email ? 'personal-area-form__input_type-error' : ''}`}
        type="email"
        id="email"
        minLength="2"
        maxLength="30"
        name="email"
        value={values.email || ''}
        onChange={handleChange}
        placeholder="Email"
        pattern="[^@]+@[^@]+\.[a-zA-Z]{2,}"
        disabled={!editing}
        required
      />
      <span className="personal-area-form__input-error">{errors.email}</span>
      {editing && (
        <>
          <input
            className={`personal-area-form__input ${errors.newPassword ? 'personal-area-form__input_type-error' : ''}`}
            type={passwordVisible ? 'text' : 'password'}
            id="newPassword"
            minLength="8"
            maxLength="14"
            name="newPassword"
            value={values.newPassword || ''}
            onChange={handleChange}
            placeholder="Новый пароль"
            autoComplete="new-password"
            disabled={!editing}
          />
          <button
            type="button"
            className={`personal-area-form__password-eye
            ${passwordVisible ?
                'personal-area-form__password-eye_open' :
                'personal-area-form__password-eye_close'}`}
            onClick={handlePasswordVisibility}
          />
          <span className="personal-area-form__input-error">
            {errors.newPassword}
          </span>
          <input
            className={`personal-area-form__input ${errors.repeatPassword ? 'personal-area-form__input_type-error' : ''}`}
            type={passwordVisible ? 'text' : 'password'}
            id="repeatPassword"
            minLength="8"
            maxLength="14"
            name="repeatPassword"
            value={values.repeatPassword || ''}
            onChange={handleChange}
            placeholder="Повторите пароль"
            autoComplete="new-password"
            disabled={!editing}
          />
          <button
            type="button"
            className={`personal-area-form__password-eye
            ${passwordVisible ?
                'personal-area-form__password-eye_open' :
                'personal-area-form__password-eye_close'}`}
            onClick={handlePasswordVisibility}
          />
          <span className="personal-area-form__input-error">
            {errors.repeatPassword}
          </span>
        </>
      )}
      {editing && (
        <button
          type="submit"
          className={`personal-area-form__button ${isValid && !isDisabledButton ? '' : 'personal-area-form__button_inactive'}`}
          disabled={!isValid || isDisabledButton}
        >
          Подтвердить
        </button>
      )}
      {!editing && (
        <button
          type="button"
          className="personal-area-form__button"
          onClick={handleEditing}
        >
          Редактировать
          <div className="personal-area-form__button-icon" />
        </button>
      )}
    </form>
  )
}

export default PersonalAreaForm;
