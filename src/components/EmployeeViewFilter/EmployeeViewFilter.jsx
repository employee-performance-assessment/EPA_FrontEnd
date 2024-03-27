import InputStars from '../InputStars/InputStars';

import styles from './EmployeeViewFilter.module.scss';

function EmployeeViewFilter({ view, handleChange }) {
  return !view ? (
    <div className={styles.employeeViewFilter__container}>
      <h3 className={styles.employeeViewFilter__title}>Фильтры:</h3>
      <button
        type="button"
        className={`${styles.employeeViewFilter__button_active} ${styles.employeeViewFilter__button}`}
      >
        К выполнению
      </button>
      <button type="button" className={styles.employeeViewFilter__button}>
        В работе
      </button>
      <button type="button" className={styles.employeeViewFilter__button}>
        На ревью
      </button>
      <button type="button" className={styles.employeeViewFilter__button}>
        Выполнено
      </button>
      <input
        type="text"
        className={styles.employeeViewFilter__input}
        placeholder="Поиск"
      />
    </div>
  ) : (
    <div className={styles.employeeViewFilter__container}>
      <div className={styles.employeeViewFilter__marks}>
        <h3 className={styles.employeeViewFilter__title}>Фильтры:</h3>
        <div className={styles.employeeViewFilter__stars}>
          <InputStars
            name={'stars'}
            handleChange={handleChange} />
        </div>
        <button
          type="button"
          className={`${styles.employeeViewFilter__button_marks} ${styles.employeeViewFilter__button}`}
        >
          Все
        </button>
      </div>
      <div className={styles.employeeViewFilter__calendar}>
        <input
          type="text"
          className={`${styles.employeeViewFilter__input_marks} ${styles.employeeViewFilter__input}`}
          placeholder="Календарь"
        />
        <button
          type="button"
          className={styles.employeeViewFilter__icon}
        ></button>
      </div>
    </div>
  );
}

export default EmployeeViewFilter;
