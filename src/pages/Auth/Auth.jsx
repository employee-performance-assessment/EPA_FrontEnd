import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './Auth.module.scss';

import { useFormValidation } from '../../hooks/useFormValidation.js';
import useLoading from '../../hooks/useLoader.js';
import { authorize } from '../../utils/auth.js';
import { getUserData } from '../../utils/mainApi.js';
import { ENDPOINT_ROUTES } from '../../constants/constantsEndpointRoute.js';

import { setToken } from '../../store/slices/tokenSlices.js';
import { setUser } from '../../store/slices/userSlice.js';

import registerImg from '../../images/register-img.png';
import eyelash from '../../images/eye-close.svg';
import eyeOpen from '../../images/eye-open.svg';
import logo from '../../images/logo.svg';

import InfoPopup from '../../components/InfoPopup/InfoPopup.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import { useErrorHandler } from '../../hooks/useErrorHandler.js';
import { saveToLocalStorage } from '../../utils/localStorageFunctions.js';
import { VALIDATION_MESSAGES } from '../../utils/validationConstants.js';

function Auth() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { personalArea, userArea } = ENDPOINT_ROUTES;
  const { errors, values, isValid, handleChange, resetForm } =
    useFormValidation();
  const { popupText, isPopupOpen, handleError, closePopup } = useErrorHandler();
  const { isLoading, setLoading } = useLoading();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    authorize({
      email: values.email,
      password: values.password,
    })
      .then((res) => {
        localStorage.setItem('token', JSON.stringify(res));
        dispatch(setToken(res.token));
        getUserData(res.token).then((res) => {
          const isAdmin = res.role === 'ROLE_ADMIN';
          const userDataWithAdmin = { ...res, isAdmin };
          saveToLocalStorage('user', userDataWithAdmin);
          dispatch(setUser(res));
          res.role === 'ROLE_ADMIN'
            ? navigate(personalArea)
            : navigate(userArea);
        });
      })
      .catch((err) => {
        handleError(err);
        resetForm();
      })
      .finally(() => setLoading(false));
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
    <>
      {isLoading && <Loader />}
      {isPopupOpen && (
        <InfoPopup text={popupText} handleClosePopup={closePopup} />
      )}
      <section className={styles.wrapper}>
        <div className={styles.container}>
          <form id="register" onSubmit={handleSubmit}>
            <img className={styles.logo} src={logo} alt="Логотип" />
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
              <span>{errors.email && VALIDATION_MESSAGES.invalidEmail}</span>
            </label>
            <label>
              <input
                type="password"
                minLength="8"
                maxLength="14"
                name="password"
                id="authPassword"
                value={values.password || ''}
                onChange={handleChange}
                placeholder="Пароль"
                autoComplete="off"
                required
                pattern="^(?=.*[A-Z])[A-Za-z0-9.,:;?!*+%\-<>@\[\]\/\\_\{\}\$\#]{8,14}$"
              />
              <span>
                {errors.password && VALIDATION_MESSAGES.invalidPassword}{' '}
              </span>
              <span
                className={styles.eye}
                onClick={togglePassword}
                style={{
                  backgroundImage: `url(${isOpen ? eyeOpen : eyelash})`,
                }}
              />
            </label>
            <button type="submit" disabled={!isValid} className={styles.loginButton}>
              Войти
            </button>
            <Link to="/signup" className={styles.link}>
              <button type="button" className={styles.registerButton}>
                Зарегистрироваться
              </button>
            </Link>
          </form>
          <img
            src={registerImg}
            alt="Изображение команды на странице регистрации"
          />
        </div>
      </section>
    </>
  );
}

export default Auth;
