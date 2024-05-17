import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slices/userSlice.js';

import { useFormValidation } from '../../hooks/useFormValidation.js';
import { register } from '../../utils/auth.js';
import { ENDPOINT_ROUTES } from '../../constants/constantsEndpointRoute.js';
import { VALIDATION_MESSAGES } from '../../utils/validationConstants.js';
import InfoPopup from '../../components/InfoPopup/InfoPopup.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import { useErrorHandler } from '../../hooks/useErrorHandler.js';
import useLoading from '../../hooks/useLoader.js';

import styles from './Register.module.scss';
import registerImg from '../../images/register-img.png';
import eyelash from '../../images/eye-close.svg';
import eyeOpen from '../../images/eye-open.svg';
import logo from '../../images/logo.svg';

function Register() {
  const [isOpen, setIsOpen] = useState(false);

  const { errors, values, isValid, handleChange, setIsValid, resetForm } =
    useFormValidation({});
  const { popupText, isPopupOpen, handleError, closePopup } = useErrorHandler();
  const { isLoading, setLoading } = useLoading();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { login } = ENDPOINT_ROUTES;
  const [errorName, setErrorName] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    register({
      fullName: values.name.trim(),
      email: values.email,
      password: values.password,
    })
      .then((res) => {
        navigate(login);
        dispatch(setUser(res));
      })
      .catch((err) => {
        handleError(err);
        resetForm();
      })
      .finally(() => setLoading(false));
  };

  const togglePassword = () => {
    const input = document.getElementById('password');
    if (input.getAttribute('type') === 'password') {
      setIsOpen(true);
      input.setAttribute('type', 'text');
    } else {
      setIsOpen(false);
      input.setAttribute('type', 'password');
    }
    return false;
  };

  useEffect(() => {
    if (values.name && values.name.trim().length === 0) {
      setIsValid(false);
      setErrorName('Поле не может состоять из пробелов');
    } else {
      setErrorName(null);
    }
  }, [values.name]);

  useEffect(() => {
    if (
      (values.email && values.email.split('')[0] === '.') ||
      (values.email && values.email.split('')[0] === '-')
    ) {
      setIsValid(false);
      setErrorEmail('Почта не может начинаться с точки или тире');
    } else {
      setErrorEmail(null);
    }
  }, [values.email]);

  return (
    <section className={styles.wrapper}>
      {isLoading && <Loader />}
      {isPopupOpen && (
        <InfoPopup text={popupText} handleClosePopup={closePopup} />
      )}
      <div className={styles.container}>
        <form id="register" onSubmit={handleSubmit}>
          <img className={styles.logo} src={logo} alt="Логотип" />
          <h1>Сервис для оценки сотрудников</h1>
          <label>
            <input
              type="data"
              id="user-name"
              minLength="1"
              maxLength="255"
              name="name"
              value={values.name || ''}
              onChange={handleChange}
              placeholder="Имя Фамилия"
              pattern="^[a-zA-Zа-яА-ЯёЁ\s\-]{1,255}$"
              required
            />
            <span>
              {(errors.name && VALIDATION_MESSAGES.invalidNameOrPosition) ||
                errorName}
            </span>
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
            <span>
              {(errors.email && VALIDATION_MESSAGES.invalidEmail) || errorEmail}
            </span>
          </label>
          <label>
            <input
              type="password"
              minLength="8"
              maxLength="14"
              name="password"
              id="password"
              value={values.password || ''}
              onChange={handleChange}
              placeholder="Пароль"
              autoComplete="off"
              required
              pattern="^(?=.*[A-Z])[A-Za-z0-9.,:;?!*+%\-<>@\[\]\/\\_\{\}\$\#]{8,14}$"
            />
            <span>
              {errors.password && VALIDATION_MESSAGES.invalidPassword}
            </span>
            <span
              className={styles.eye}
              onClick={togglePassword}
              role="button"
              tabIndex="0"
              style={{ backgroundImage: `url(${isOpen ? eyeOpen : eyelash})` }}
            />
          </label>
          <button
            type="submit"
            disabled={!isValid}
            className={styles.submitButton}
          >
            Подтвердить
          </button>
          <Link to="/login" className={styles.link}>
            <button type="button" className={styles.loginButton}>
              У меня уже есть аккаунт
            </button>
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

export default Register;
