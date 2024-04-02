import SetStars from '../SetStars/SetStars';
import styles from './EmployeeViewHeader.module.scss';

function EmployeeViewHeader({ employee }) {

  const month = 'февраль';
  const rating = '3.5';
  const point = 1250;
  return (
    <div className={styles.employeeViewHeader__container}>
      <div className={styles.employeeViewHeader__bio}>
        <div className={styles.employeeViewHeader__image} />
        <p className={styles.employeeViewHeader__name}>{employee.fullName}</p>
        <p className={styles.employeeViewHeader__job}>
          {employee.position || 'Должность неизвестна'}
        </p>
      </div>
      <div className={styles.employeeViewHeader__rating}>
        <p>Рейтинг за {month}</p>
        <div className={styles.employeeViewHeader__stars}>
          <SetStars
            rating={rating}
            starOut={styles.employeeViewHeader__star_out}
            starIn={styles.employeeViewHeader__star_in}
          />
        </div>
      </div>
      <div className={styles.employeeViewHeader__point}>{point} баллов</div>
    </div>
  );
}

export default EmployeeViewHeader;
