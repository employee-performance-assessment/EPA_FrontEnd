import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormValidation } from '../../hooks/useFormValidation.js';
import { updateAdminData } from '../../utils/mainApi.js';
import { setUser } from '../../store/slices/userSlice.js';
import InfoPopup from '../../components/InfoPopup/InfoPopup.jsx';
import { useErrorHandler } from '../../hooks/useErrorHandler.js';
import './PersonalArea.scss';

function PersonalArea() {
  const { popupTitle, popupText, isPopupOpen, handleError, closePopup } = useErrorHandler();
  const [editing, setEditing] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { errors, values, isValid, handleChange } = useFormValidation();
  const admin = useSelector((state) => state.user);
  const [isDisabledButton, setIsDisabledButton] = useState(false);
  const dispatch = useDispatch();

  function setVisibleInputData() {
    if (!values.name && !editing) {
      values.name = admin.fullName;
      values.email = admin.email;
      values.job = admin.position || 'Руководитель';
      values.repeatPassword = '';
      values.newPassword = '';
    }
  }

  setVisibleInputData();

  useEffect(() => {
    if (checkPassword()) {
      setIsDisabledButton(false);
    } else {
      setIsDisabledButton(true);
    }
  }, [values.newPassword, values.repeatPassword]);

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

  function handleEditing() {
    setEditing(true);
  }

  function handlePasswordVisibility() {
    setPasswordVisible(!passwordVisible);
  }

  return (
    <section className="personal-area">
      {isPopupOpen && <InfoPopup title={popupTitle} text={popupText} handleClosePopup={closePopup} />}
      <div className="personal-area__header">
        <div className="personal-area__header-icon" />
        <h2 className="personal-area__header-title">{admin.fullName}</h2>
        <div className="personal-area__header-job">
          {admin.position || 'Руководитель'}
        </div>
      </div>
      <div className="personal-area__section">
        <form className="personal-area__form" onSubmit={handleSubmit}>
          <h2 className="personal-area__title">
            {editing ? 'Редактирование' : 'Личные данные'}
          </h2>
          <input
            className={`personal-area__input ${errors.name ? 'personal-area__input_type-error' : ''}`}
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
          />
          <span className="personal-area__input-error">{errors.name}</span>
          <input
            className={`personal-area__input ${errors.job ? 'personal-area__input_type-error' : ''}`}
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
          />
          <span className="personal-area__input-error">{errors.job}</span>
          <input
            className={`personal-area__input ${errors.email ? 'personal-area__input_type-error' : ''}`}
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
          />
          <span className="personal-area__input-error">{errors.email}</span>
          {editing && (
            <>
              <input
                className={`personal-area__input ${errors.newPassword ? 'personal-area__input_type-error' : ''}`}
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
              <span
                className={`personal-area__password-eye ${passwordVisible
                  ? 'personal-area__password-eye_open'
                  : 'personal-area__password-eye_close'
                  }`}
                onClick={handlePasswordVisibility}
              />
              <span className="personal-area__input-error">
                {errors.newPassword}
              </span>
              <input
                className={`personal-area__input ${errors.repeatPassword ? 'personal-area__input_type-error' : ''}`}
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
              <span
                className={`personal-area__password-eye ${passwordVisible
                  ? 'personal-area__password-eye_open'
                  : 'personal-area__password-eye_close'
                  }`}
                onClick={handlePasswordVisibility}
              />
              <span className="personal-area__input-error">
                {errors.repeatPassword}
              </span>
            </>
          )}
          {editing && (
            <button
              type="submit"
              className={`personal-area__button ${isValid && !isDisabledButton ? '' : 'personal-area__button_inactive'}`}
              disabled={!isValid || isDisabledButton}
            >
              Подтвердить
            </button>
          )}
          {!editing && (
            <button
              type="button"
              className="personal-area__button"
              onClick={handleEditing}
            >
              Редактировать
              <div className="personal-area__button-icon" />
            </button>
          )}
        </form>
        {!editing && (
          <div className="personal-area__questionnaire">
            <h3 className="personal-area__questionnaire-title">
              Анкета для оценки
            </h3>
            <Link
              to="/criteria-setting"
              className="personal-area__questionnaire-link"
            >
              <div className="personal-area__questionnaire-container">
                <p className="personal-area__questionnaire-text">
                  {`Вы можете редактировать анкету
              для оценки сотрудника.
              Добавлять новые критерии
              и менять заданные.`}
                </p>
                <p className="personal-area__questionnaire-text">
                  {`У вас есть возможность выбрать,
              что будет влиять на рейтинг
              сотрудника, только Ваши оценки или
              оценки всей команды.`}
                </p>
                <p className="personal-area__questionnaire-text">
                  Перейти к анкете
                  <span className="personal-area__questionnaire-link-icon" />
                </p>
              </div>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default PersonalArea;
