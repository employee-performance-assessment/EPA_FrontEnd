import { useNavigate, Link } from 'react-router-dom';
import styles from './Auth.module.scss';

import Logo from '../Logo/Logo.jsx';
import { useFormValidation } from '../../utils/hooks/useFormValidation.js';

import registerImg from '../../images/register-img.png';

function Auth({ isLoggedIn }) {
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
            Войти
          </button>
          <Link to="signup" className={styles.link}>
            Зарегистрироваться
          </Link>
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

export default Auth;
