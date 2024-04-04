import { useNavigate } from 'react-router';
import { ENDPOINT_ROUTES } from '../../constants/constantsEndpointRoute.js';
import styles from './AssessmentCard.module.scss';
import './AssessmentCard.css';

function AssessmentCard({user, name , job, status}) {
  const navigate = useNavigate();
  const { questionnaire } = ENDPOINT_ROUTES;

  return (
    <div className={styles.assessmentCard__container}>
      <p className={styles.assessmentCard__name}>{name}</p>
      <p className={styles.assessmentCard__job}>&frasl; {job}</p>
      <div className={styles.assessmentCard__rating}>
        Оценки за март
        <p className={styles.assessmentCard__data}>
          Дата анкетирования: 28.03.24
        </p>
      </div>
      <button
        type="button"
        className={status}
        onClick={() => navigate(`${questionnaire}/${user}`)}
        >
        {status === 'asses' ? 'Оценить' : 'Отправлено'}
      </button>
    </div>
  );
}

export default AssessmentCard;
