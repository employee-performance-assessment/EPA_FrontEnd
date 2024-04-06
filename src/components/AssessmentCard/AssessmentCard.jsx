import { useNavigate } from 'react-router';
import { ENDPOINT_ROUTES } from '../../constants/constantsEndpointRoute.js';
import styles from './AssessmentCard.module.scss';
import './AssessmentCard.css';

function AssessmentCard({ user, fullName, position, status }) {
  const navigate = useNavigate();
  const { questionnaire } = ENDPOINT_ROUTES;

  function handleClick() {
    navigate(`${questionnaire}/${user}`);
  }

  return (
    <div className={styles.assessmentCard}
      onClick={handleClick}
    >
      <p className={styles.assessmentCard__name}>{fullName}</p>
      <p className={styles.assessmentCard__job}>&frasl; {position}</p>
      <div className={styles.assessmentCard__rating}>
        Оценки за март
        <p className={styles.assessmentCard__data}>
          Дата анкетирования: 28.03.24
        </p>
      </div>
      <div className={status}>
        {status === 'isAppreciated' ? 'Оценить' : 'Отправлено'}
      </div>
    </div>
  );
}

export default AssessmentCard;
