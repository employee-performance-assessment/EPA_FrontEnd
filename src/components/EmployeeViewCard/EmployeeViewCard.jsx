import setStars from '../../utils/setStars';
import styles from './EmployeeViewCard.module.scss';

function EmployeeViewCard({
  type,
  title,
  deadline,
  terms,
  points,
  rating,
  month,
  date,
  handleClickMarks,
  handleClickTasks
}) {
  return type === 'tasks' ? (
    <div className={styles.employeeViewCard__container} onClick={handleClickTasks} >
      <div className={styles.employeeViewCard__text}>
        <h2 className={styles.employeeViewCard__title}>{title}</h2>
        <p className={styles.employeeViewCard__deadline}>Дедлайн: {deadline}</p>
        <p className={styles.employeeViewCard__terms}>{terms}</p>
      </div>
      <div className={styles.employeeViewCard__rating}>{points} баллов</div>
      <div className={styles.employeeViewCard__button}>Подробнее</div>
    </div>
  ) : (
    <div className={styles.employeeViewCard__container} onClick={handleClickMarks} >
      <div className={styles.employeeViewCard__text}>
        <h2 className={styles.employeeViewCard__title}>Оценки за {month}</h2>
        <p className={styles.employeeViewCard__date}>
          Дата анкетирования: {date}
        </p>
      </div>
      <div className={styles.employeeViewCard__stars}>
        {setStars(rating, styles.cardRating__star_out, styles.cardRating__star_in)}
      </div>
      <div className={styles.employeeViewCard__button}>Подробнее</div>
    </div>
  );
}

export default EmployeeViewCard;
