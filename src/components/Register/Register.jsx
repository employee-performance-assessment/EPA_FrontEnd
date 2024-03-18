import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAdminData } from '../../store/slices/adminDataSlices.js';
import { setIsLoggedIn } from '../../store/slices/isLoggedInSlice.js';

import Logo from '../Logo/Logo.jsx';
import { useFormValidation } from '../../utils/hooks/useFormValidation.js';

import styles from './Register.module.scss';
import registerImg from '../../images/register-img.png';
import { register } from '../../utils/registration.js';

function Register() {
  const navigate = useNavigate();
  const { errors, values, isValid, handleChange } = useFormValidation();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    register({
      fullName: values.name,
      email: values.email,
      password: values.password
    })
      .then((res) => {
        navigate('/login');
        dispatch(setAdminData(res));
        dispatch(setIsLoggedIn(true));
      })
      .catch((err) => console.log(err)); //* * добавить показ ошибки в модалке */
  };

  return (
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
              pattern="^[а-яА-Я\s\-]+$"
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
  );
}

export default Register;
