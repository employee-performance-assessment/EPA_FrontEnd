import styles from './EmployeeViewHeader.module.scss';

function EmployeeViewHeader() {
  const name = 'Иван Иванов';
  const job = 'Разработчик';
  const month = 'февраль';
  const rating = 1250;
  return (
    <div className={styles.employeeViewHeader__container}>
      <div className={styles.employeeViewHeader__bio}>
        <div className={styles.employeeViewHeader__image}></div>
        <p className={styles.employeeViewHeader__name}>{name}</p>
        <p className={styles.employeeViewHeader__job}>{job}</p>
      </div>
      <div className={styles.employeeViewHeader__stars}>
        <p>Рейтинг за {month}</p>
        <div></div>
      </div>
      <div className={styles.employeeViewHeader__rating}>{rating} баллов</div>
    </div>
  );
}

export default EmployeeViewHeader;
