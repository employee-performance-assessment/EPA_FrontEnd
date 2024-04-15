import { useNavigate } from 'react-router-dom';
import SetStars from '../SetStars/SetStars';
import styles from './EmployeeViewCard.module.scss';
import { formatDate, calculatePercentage } from '../../utils/utils';
import { ENDPOINT_ROUTES } from '../../constants/constantsEndpointRoute.js';

function EmployeeViewCard({
  type,
  task,
  rating,
  date,
  employeeId,
  idQuestionnaire,
}) {
  const currentDate = date && date.split('-').reverse().join('.');

  const navigate = useNavigate();

  const lateFine =
    task && calculatePercentage(task.penaltyPoints, task.basicPoints);

  return type === 'tasks' ? (
    <div
      className={styles.employeeViewCard__container}
      role="button"
      onClick={() => navigate(`${ENDPOINT_ROUTES.taskCards}/${task.id}`)}
      tabIndex={0}
    >
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
      <button className={styles.employeeViewCard__button}>Подробнее</button>
    </div>
  ) : (
    <div
      className={styles.employeeViewCard__container}
      role="button"
      onClick={() =>
        navigate(
          employeeId
            ? `${ENDPOINT_ROUTES.ratingCards}/${employeeId}/${idQuestionnaire}`
            : `${ENDPOINT_ROUTES.ratingCards}/${idQuestionnaire}`
        )
      }
      tabIndex={0}
    >
      <h2 className={styles.employeeViewCard__title}>
        Дата анкетирования: <p>{currentDate}</p>
      </h2>
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
