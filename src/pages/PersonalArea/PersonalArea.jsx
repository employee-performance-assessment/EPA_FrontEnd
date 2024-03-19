import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormValidation } from '../../utils/hooks/useFormValidation.js';
import './PersonalArea.css';

function PersonalArea() {
  const [editing, setEditing] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const { errors, values, isValid, handleChange } = useFormValidation();

  function handleSubmit(e) {
    e.preventDefault();
    setEditing(false);

    //* * здесь дописть код для отправки обновленных данных формы на сервер */
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
          minLength="2"
          maxLength="30"
          name="name"
          value={values.name || ''}
          onChange={handleChange}
          placeholder="Имя Фамилия"
          required
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
          required
        />
        <span className="personal-area__input-error">{errors.job}</span>
        <input
          className={`personal-area__input ${!editing ? 'personal-area__input_type-disable' : ''} ${errors.project ? 'personal-area__input_type-error' : ''}`}
          type="text"
          id="project"
          minLength="2"
          maxLength="30"
          name="project"
          value={values.project || ''}
          onChange={handleChange}
          placeholder="Проект"
          required
        />
        <span className="personal-area__input-error">{errors.project}</span>
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
          required
        />
        <span className="personal-area__input-error">{errors.email}</span>
        <input
          className={`personal-area__input ${!editing ? 'personal-area__input_type-disable' : ''} ${errors.password ? 'personal-area__input_type-error' : ''}`}
          type={passwordVisible ? 'text' : 'password'}
          id="password"
          minLength="8"
          name="password"
          value={values.password || ''}
          onChange={handleChange}
          placeholder="Пароль"
          required
          autoComplete="new-password"
        />
        <span
          className={`personal-area__password-eye ${passwordVisible ?
            'personal-area__password-eye_open' :
            'personal-area__password-eye_close'}`}
          onClick={handlePasswordVisibility}
        />
        <span className="personal-area__input-error">{errors.password}</span>
        {editing &&
          <button
            type="submit"
            className={`personal-area__button ${isValid ? '' : 'personal-area__button_inactive'}`}
            disabled={!isValid}
          >
            {'Подтвердить'}
            <div className={`personal-area__button-icon ${isValid ? '' : 'personal-area__button-icon_inactive'}`} />
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
