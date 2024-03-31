import SetStars from '../SetStars/SetStars';
import styles from './EmployeeViewCard.module.scss';

function EmployeeViewCard({
  type,
  title,
  deadline,
  terms,
  points,
  rating,
  date,
  handleClickMarks,
  handleClickTasks,
}) {
  const options = {
    day: 'numeric',
    month: 'numeric',
    year: '2-digit',
  };

  const currentDate = new Date(date);
  const month = currentDate.toLocaleString('default', { month: 'long' });
  const day = currentDate.toLocaleString('default', options);

  return type === 'tasks' ? (
    <div
      className={styles.employeeViewCard__container}
      onClick={handleClickTasks}
    >
      <div className={styles.employeeViewCard__text}>
        <h2 className={styles.employeeViewCard__title}>{title}</h2>
        <p className={styles.employeeViewCard__deadline}>Дедлайн: {deadline}</p>
        <p className={styles.employeeViewCard__terms}>{terms}</p>
      </div>
      <div className={styles.employeeViewCard__rating}>{points} баллов</div>
      <div className={styles.employeeViewCard__button}>Подробнее</div>
    </div>
  ) : (
    <div
      className={styles.employeeViewCard__container}
      onClick={handleClickMarks}
    >
      <div className={styles.employeeViewCard__text}>
        <h2 className={styles.employeeViewCard__title}>Оценки за {month}</h2>
        <p className={styles.employeeViewCard__date}>
          Дата анкетирования: {day}
        </p>
      </div>
      <div className={styles.employeeViewCard__stars}>
        <SetStars
          rating={rating}
          starOut={styles.cardRating__star_out}
          starIn={styles.cardRating__star_in}
        />
      </div>
      <div className={styles.employeeViewCard__button}>Подробнее</div>
    </div>
  );
}

export default EmployeeViewCard;
