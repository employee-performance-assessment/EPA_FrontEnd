import { useNavigate } from 'react-router';
import { ENDPOINT_ROUTES } from '../../constants/constantsEndpointRoute.js';
import styles from './AssessmentCard.module.scss';

function AssessmentCard({ name, job }) {
  const navigate = useNavigate();
  const { questionnaire } = ENDPOINT_ROUTES;

  function handleClick() {
    navigate(questionnaire);
  }

  return (
    <div className={styles.assessmentCard__container}>
      <p className={styles.assessmentCard__name}>{name}</p>
      <p className={styles.assessmentCard__job}>{job}</p>
      <div className={styles.assessmentCard__rating} />
      <button
        type="button"
        className={styles.assessmentCard__button}
        onClick={() => handleClick()}
      >
        Оценить
      </button>
    </div>
  );
}

export default AssessmentCard;
