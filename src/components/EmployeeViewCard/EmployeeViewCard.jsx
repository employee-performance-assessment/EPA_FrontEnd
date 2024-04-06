import { useNavigate } from 'react-router-dom';
import SetStars from '../SetStars/SetStars';
import styles from './EmployeeViewCard.module.scss';
import { formatDate, calculatePercentage } from '../../utils/utils';
import { ENDPOINT_ROUTES } from '../../constants/constantsEndpointRoute.js';

function EmployeeViewCard({ type, task, rating, date, employeeId }) {
  const options = {
    day: 'numeric',
    month: 'numeric',
    year: '2-digit',
  };
  const navigate = useNavigate();
  const currentDate = new Date(date);
  const month = currentDate.toLocaleString('default', { month: 'long' });
  const day = currentDate.toLocaleString('default', options);

  const lateFine = calculatePercentage(task.penaltyPoints, task.basicPoints);

  return type === 'tasks' ? (
    <div className={styles.employeeViewCard__container}>
      <div className={styles.employeeViewCard__text}>
        <h2 className={styles.employeeViewCard__title}>{task.name}</h2>
        <p className={styles.employeeViewCard__deadline}>
          Дедлайн: {formatDate(task.deadLine)}
        </p>
        <p className={styles.employeeViewCard__terms}>
          {`-${lateFine}% за просрочку дедлайна`}
        </p>
      </div>
      <div className={styles.employeeViewCard__rating}>
        {task.basicPoints} баллов
      </div>
      <button
        type="button"
        className={styles.employeeViewCard__button}
        onClick={() => navigate(`${ENDPOINT_ROUTES.taskCards}/${task.id}`)}
      >
        Подробнее
      </button>
    </div>
  ) : (
    <div className={styles.employeeViewCard__container}>
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
      <button
        type="button"
        className={styles.employeeViewCard__button}
        onClick={() => navigate(`${ENDPOINT_ROUTES.ratingCards}/${employeeId}`)}
      >
        Подробнее
      </button>
    </div>
  );
}

export default EmployeeViewCard;
