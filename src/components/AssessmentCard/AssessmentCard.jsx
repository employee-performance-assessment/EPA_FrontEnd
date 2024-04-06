import { useNavigate } from 'react-router';
import { ENDPOINT_ROUTES } from '../../constants/constantsEndpointRoute.js';
import styles from './AssessmentCard.module.scss';

function AssessmentCard({
  fullName,
  position,
  date,
  questionnaireId,
  employeeId,
  status
}) {
  const navigate = useNavigate();
  const { questionnaire } = ENDPOINT_ROUTES;

  const currentDate = date.split('-').reverse().join('.');

  function handleClick() {
    navigate(`${questionnaire}/${currentDate}/${questionnaireId}/${employeeId}`);
  }

  return (
    <div className={styles.assessmentCard} onClick={handleClick} >
      <p className={styles.assessmentCard__name}>{fullName}</p>
      <p className={styles.assessmentCard__job}>&frasl; {position}</p>
      <div className={styles.assessmentCard__rating}>
        <p className={styles.assessmentCard__date}>Дата анкетирования:</p>
        <p className={styles.assessmentCard__date}>{currentDate}</p>
      </div>
      <div className={status === 'asses' ? styles.assessmentCard_asses : styles.assessmentCard_notAsses}>
        {status === 'asses' ? 'Оценить' : 'Отправлено'}
      </div>
    </div>
  );
}

export default AssessmentCard;
