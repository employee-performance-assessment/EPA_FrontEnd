import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormValidation } from '../../utils/hooks/useFormValidation.js';
import './AdminCard.css';

function AdminCard() {
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
    <div className="admin-card">
      <form className="admin-card__form" onSubmit={handleSubmit}>
        <h2 className="admin-card__title">{editing ? 'Редактирование' : 'Личные данные'}</h2>
        <input
          className={`admin-card__input ${!editing ? 'admin-card__input_type-disable' : ''} ${errors.name ? 'admin-card__input_type-error' : ''}`}
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
        <span className="admin-card__input-error">{errors.name}</span>
        <input
          className={`admin-card__input ${!editing ? 'admin-card__input_type-disable' : ''} ${errors.job ? 'admin-card__input_type-error' : ''}`}
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
        <span className="admin-card__input-error">{errors.job}</span>
        <input
          className={`admin-card__input ${!editing ? 'admin-card__input_type-disable' : ''} ${errors.project ? 'admin-card__input_type-error' : ''}`}
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
        <span className="admin-card__input-error">{errors.project}</span>
        <input
          className={`admin-card__input ${!editing ? 'admin-card__input_type-disable' : ''} ${errors.email ? 'admin-card__input_type-error' : ''}`}
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
        <span className="admin-card__input-error">{errors.email}</span>
        <input
          className={`admin-card__input ${!editing ? 'admin-card__input_type-disable' : ''} ${errors.password ? 'admin-card__input_type-error' : ''}`}
          type={passwordVisible ? 'text' : 'password'}
          id="password"
          minLength="4"
          maxLength="8"
          name="password"
          value={values.password || ''}
          onChange={handleChange}
          placeholder="Пароль"
          required
          autoComplete="new-password"
        />
        <span
          className={`admin-card__password-eye ${passwordVisible ?
            'admin-card__password-eye_open' :
            'admin-card__password-eye_close'}`}
            onClick={handlePasswordVisibility}
        />
        <span className="admin-card__input-error">{errors.password}</span>
        {editing &&
          <button
            type="submit"
            className={`admin-card__button ${isValid ? '' : 'admin-card__button_inactive'}`}
            disabled={!isValid}
          >
            {'Подтвердить'}
            <div className={`admin-card__button-icon ${isValid ? '' : 'admin-card__button-icon_inactive'}`} />
          </button>}
        {!editing &&
          <button
            type="button"
            className="admin-card__button"
            onClick={handleEditing}
          >
            {'Редактировать'}
            <div className="admin-card__button-icon" />
          </button>}
      </form>
      {!editing && <div className="admin-card__questionnaire">
        <h3 className="admin-card__questionnaire-title">{'Анкета оценки соотрудников'}</h3>
        <Link to={'/setting-questionnaire'} className="admin-card__questionnaire-link">
          <div className="admin-card__questionnaire-container">
            <p className="admin-card__questionnaire-text">
              {`Вы можете редактировать анкету
              для оценки сотрудника.
              Добавлять новые критерии
              и менять заданные.`}
            </p>
            <p className="admin-card__questionnaire-text">
              {`У вас есть возможность выбрать,
              что будет влиять на рейтинг
              сотрудника, только Ваши оценки или
              оценки всей команды.`}
            </p>
            <p className="admin-card__questionnaire-text">
              {'Перейти к анкете'}
              <span className="admin-card__questionnaire-link-icon" />
            </p>
          </div>
        </Link>
      </div>}
    </div >
  );
}

export default AdminCard;
