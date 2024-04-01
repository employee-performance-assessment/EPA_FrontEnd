import { useNavigate } from 'react-router';
import styles from './AssessmentCard.module.scss';

function AssessmentCard({ name, job }) {
  const navigate = useNavigate();
  function handleClick() {
    navigate('/questionnaire');
  }
  return (
    <div className={styles.assessmentCard__container}>
      <p className={styles.assessmentCard__name}>{name}</p>
      <p className={styles.assessmentCard__job}>&frasl;{job}</p>
      <div className={styles.assessmentCard__rating}>Оценки за март
      <p className={styles.assessmentCard__data}>Дата анкетирования: 28.03.24</p></div>
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
