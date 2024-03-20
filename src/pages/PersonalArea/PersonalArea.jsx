import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormValidation } from '../../utils/hooks/useFormValidation.js';
import { getUserData, updateUserData } from '../../utils/mainApi.js';
import { setAdminData } from '../../store/slices/adminDataSlices.js';
import './PersonalArea.css';

function PersonalArea() {
  const [editing, setEditing] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { errors, values, isValid, handleChange } = useFormValidation();
  const token = useSelector((state) => state.token.token);
  const adminData = useSelector((state) => state.adminData.adminData);
  const dispatch = useDispatch();
  const [isDisabledButton, setIsDisabledButton] = useState(false);

  useEffect(() => {
    getUserData(token)
      .then((res) => {
        dispatch(setAdminData(res));
      })
      .catch((err) => console.log(err)); //* * добавить показ ошибки в модалке */
  }, []);

  useEffect(() => {
    values.name = adminData.fullName;
    values.email = adminData.email;
    values.job = adminData.position || '';
  }, [adminData]);

  useEffect(() => {
    if (checkPassword()) {
      setIsDisabledButton(false);
    } else {
      setIsDisabledButton(true);
      errors.repeatPassword = 'Пароли не совпадают';
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

    updateUserData(adminData.id, token, newUserDataForServer)
      .then(() => {
        setEditing(false);
        dispatch(setAdminData({ ...adminData, ...newUserData }));
        values.repeatPassword = '';
        values.newPassword = '';
      })
      .catch((err) => console.log(err)); //* * добавить показ ошибки в модалке */
  }

  function handleEditing() {
    setEditing(true);
  }

  function handlePasswordVisibility() {
    setPasswordVisible(!passwordVisible);
  }

  return (
    <div className="personal-area">
      <form className="personal-area__form" onSubmit={handleSubmit}>
        <h2 className="personal-area__title">{editing ? 'Редактирование' : 'Личные данные'}</h2>
        <input
          className={`personal-area__input ${!editing ? 'personal-area__input_type-disable' : ''} ${errors.name ? 'personal-area__input_type-error' : ''}`}
          type="text"
          id="name"
          minLength="1"
          maxLength="255"
          name="name"
          value={values.name || ''}
          onChange={handleChange}
          placeholder="Имя Фамилия"
        />
        <span className="personal-area__input-error">{errors.name}</span>
        <input
          className={`personal-area__input ${!editing ? 'personal-area__input_type-disable' : ''} ${errors.job ? 'personal-area__input_type-error' : ''}`}
          type="text"
          id="job"
          minLength="2"
          maxLength="30"
          name="job"
          value={values.job || ''}
          onChange={handleChange}
          placeholder="Должность"
        />
        <span className="personal-area__input-error">{errors.job}</span>
        <input
          className={`personal-area__input ${!editing ? 'personal-area__input_type-disable' : ''} ${errors.email ? 'personal-area__input_type-error' : ''}`}
          type="email"
          id="email"
          minLength="2"
          maxLength="30"
          name="email"
          value={values.email || ''}
          onChange={handleChange}
          placeholder="Email"
        />
        <span className="personal-area__input-error">{errors.email}</span>
        {editing &&
          <>
            <input
              className={`personal-area__input ${!editing ? 'personal-area__input_type-disable' : ''} ${errors.newPassword ? 'personal-area__input_type-error' : ''}`}
              type={passwordVisible ? 'text' : 'password'}
              id="newPassword"
              minLength="8"
              maxLength="14"
              name="newPassword"
              value={values.newPassword || ''}
              onChange={handleChange}
              placeholder="Новый пароль"
              autoComplete="new-password"
            />
            <span
              className={`personal-area__password-eye ${passwordVisible ?
                'personal-area__password-eye_open' :
                'personal-area__password-eye_close'}`}
              onClick={handlePasswordVisibility}
            />
            <span className="personal-area__input-error">{errors.newPassword}</span>
            <input
              className={`personal-area__input ${!editing ? 'personal-area__input_type-disable' : ''} ${errors.repeatPassword ? 'personal-area__input_type-error' : ''}`}
              type={passwordVisible ? 'text' : 'password'}
              id="repeatPassword"
              minLength="8"
              maxLength="14"
              name="repeatPassword"
              value={values.repeatPassword || ''}
              onChange={handleChange}
              placeholder="Повторите пароль"
              autoComplete="new-password"
            />
            <span
              className={`personal-area__password-eye ${passwordVisible ?
                'personal-area__password-eye_open' :
                'personal-area__password-eye_close'}`}
              onClick={handlePasswordVisibility}
            />
            <span className="personal-area__input-error">{errors.repeatPassword}</span>
          </>}
        {editing &&
          <button
            type="submit"
            className={`personal-area__button ${isValid && !isDisabledButton ? '' : 'personal-area__button_inactive'}`}
            disabled={!isValid || isDisabledButton}
          >
            {'Подтвердить'}
            <div className={`personal-area__button-icon ${isValid && !isDisabledButton ? '' : 'personal-area__button-icon_inactive'}`} />
          </button>}
        {!editing &&
          <button
            type="button"
            className="personal-area__button"
            onClick={handleEditing}
          >
            {'Редактировать'}
            <div className="personal-area__button-icon" />
          </button>}
      </form>
      {!editing && <div className="personal-area__questionnaire">
        <h3 className="personal-area__questionnaire-title">{'Анкета оценки соотрудников'}</h3>
        <Link to={'/setting-questionnaire'} className="personal-area__questionnaire-link">
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
              {'Перейти к анкете'}
              <span className="personal-area__questionnaire-link-icon" />
            </p>
          </div>
        </Link>
      </div>}
    </div >
  );
}

export default PersonalArea;