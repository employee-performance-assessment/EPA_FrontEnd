import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { ENDPOINT_ROUTES } from '../../constants/constantsEndpointRoute.js';
import styles from './AssessmentCard.module.scss';

function AssessmentCard({
  fullName,
  position,
  date,
  questionnaireId,
  employeeId
}) {
  const isAppreciated = useSelector((state) => state.isAppreciated.isAppreciated);
  const navigate = useNavigate();
  const { questionnaire } = ENDPOINT_ROUTES;
  const currentDate = date.split('-').reverse().join('.');

  function handleClick() {
    navigate(`${questionnaire}/${currentDate}/${questionnaireId}/${employeeId}`);
  }

  return (
    <div className={styles.assessmentCard} onClick={handleClick} role="button" tabIndex={0}>
      <p className={styles.assessmentCard__name}>{fullName}</p>
      <div className={styles.assessmentCard__jobContainer}>
        <p className={styles.assessmentCard__delimiter}>/</p>
        <p className={styles.assessmentCard__job}>{position}</p>
      </div>
      <div>
        <p className={styles.assessmentCard__date}>Дата анкетирования:</p>
        <p className={styles.assessmentCard__date}>{currentDate}</p>
      </div>
      <div className={isAppreciated ?
        styles.assessmentCard__buttonAppreciated :
        styles.assessmentCard__buttonNotAppreciated}>
        {isAppreciated ? 'Оценить' : 'Отправлено'}
      </div>
    </div >
  );
}

export default AssessmentCard;
