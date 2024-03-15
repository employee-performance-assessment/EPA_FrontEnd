import { useNavigate } from 'react-router-dom';

import Logo from '../Logo/Logo.jsx';
import { useFormValidation } from '../../utils/hooks/useFormValidation.js';

import styles from './Register.module.scss';
import registerImg from '../../images/register-img.png';

function Register({ isLoggedIn }) {
  const navigate = useNavigate();
  const { errors, values, isValid, handleChange } = useFormValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return isLoggedIn ? (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <form id="register" onSubmit={handleSubmit}>
          <Logo />
          <h1>Сервис для оценки сотрудников</h1>
          <label>
            <input
              type="text"
              id="user-name"
              minLength="2"
              maxLength="30"
              name="name"
              value={values.name || ''}
              onChange={handleChange}
              placeholder="Имя Фамилия"
              pattern="^[а-яА-Яa-zA-Z\s\-]+$"
              required
            />
            <span>{errors.name}</span>
          </label>
          <label>
            <input
              type="email"
              pattern="[^@]+@[^@]+\.[a-zA-Z]{2,}"
              name="email"
              value={values.email || ''}
              onChange={handleChange}
              placeholder="Email"
              autoComplete="off"
              required
            />
            <span>{errors.email}</span>
          </label>
          <label>
            <input
              type="password"
              minLength="4"
              maxLength="12"
              name="password"
              value={values.password || ''}
              onChange={handleChange}
              placeholder="Пароль"
              autoComplete="off"
              required
            />
            <span>{errors.password}</span>
          </label>
          <button type="submit" disabled={!isValid}>
            Подтвердить
          </button>
        </form>
        <img
          src={registerImg}
          alt="Изображение команды на странице регистрации"
        />
      </div>
    </section>
  ) : (
    navigate('/', { replace: true })
  );
}

export default Register;
