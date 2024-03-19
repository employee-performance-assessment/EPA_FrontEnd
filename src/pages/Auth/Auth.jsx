import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './Auth.module.scss';

import { useFormValidation } from '../../utils/hooks/useFormValidation.js';
import { authorize } from '../../utils/registration.js';
import { setToken } from '../../store/slices/tokenSlices.js';
import { setIsLoggedIn } from '../../store/slices/isLoggedInSlice.js';

import Logo from '../../components/Logo/Logo.jsx';
import registerImg from '../../images/register-img.png';

import eyelash from '../../images/eye-close.svg';
import eyeOpen from '../../images/eye-open.svg';

function Auth() {
  const [isOpen, setIsOpen] = useState(false);
  const { errors, values, isValid, handleChange } = useFormValidation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    authorize({
      email: values.email,
      password: values.password
    })
      .then((res) => {
        localStorage.setItem('token', JSON.stringify(res));
        navigate('/admin-person-area');
        dispatch(setToken(res));
        dispatch(setIsLoggedIn(true));
      })
      .catch((err) => console.log(err)); //* * добавить показ ошибки в модалке */
  };

  const togglePassword = () => {
    const input = document.getElementById('authPassword');
    if (input.getAttribute('type') === 'password') {
      setIsOpen(true);
      input.setAttribute('type', 'text');
    } else {
      setIsOpen(false);
      input.setAttribute('type', 'password');
    }
    return false;
  };

  return (
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
              id='authPassword'
              value={values.password || ''}
              onChange={handleChange}
              placeholder="Пароль"
              autoComplete="off"
              required
            />
            <span>{errors.password}</span>
            {isOpen ? (
              <span
                className={styles.eye}
                onClick={togglePassword}
                style={{ backgroundImage: `url(${eyeOpen})` }}
              ></span>
            ) : (
              <span
                className={styles.eye}
                onClick={togglePassword}
                style={{ backgroundImage: `url(${eyelash})` }}
              ></span>
            )}
          </label>
          <button type="submit" disabled={!isValid}>
            Войти
          </button>
          <Link to="/signup" className={styles.link}>
            Зарегистрироваться
          </Link>
        </form>
        <img
          src={registerImg}
          alt="Изображение команды на странице регистрации"
        />
      </div>
    </section>
  );
}

export default Auth;
