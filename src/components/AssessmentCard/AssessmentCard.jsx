import { useNavigate } from 'react-router';
import { ENDPOINT_ROUTES } from '../../constants/constantsEndpointRoute.js';
import styles from './AssessmentCard.module.scss';

function AssessmentCard({ user, fullName, position, status }) {
  const navigate = useNavigate();
  const { questionnaire } = ENDPOINT_ROUTES;

  function handleClick() {
    navigate(`${questionnaire}/${user.id}`);
  }

  return (
    <div className={styles.assessmentCard} onClick={handleClick} >
      <p className={styles.assessmentCard__name}>{fullName}</p>
      <p className={styles.assessmentCard__job}>&frasl; {position}</p>
      <div className={styles.assessmentCard__rating}>
        Оценки за март
        <p className={styles.assessmentCard__data}>
          Дата анкетирования: 28.03.24
        </p>
      </div>
      <div className={status === 'asses' ? styles.assessmentCard_asses : styles.assessmentCard_notAsses}>
        {status === 'asses' ? 'Оценить' : 'Отправлено'}
      </div>
    </div>
  );
}

export default AssessmentCard;
