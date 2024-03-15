import styles from './AssessmentCard.module.scss';

function AssessmentCard({ name, job }) {
  return (
    <div className={styles.assessmentCard__container}>
      <p className={styles.assessmentCard__name}>{name}</p>
      <p className={styles.assessmentCard__job}>{job}</p>
      <div className={styles.assessmentCard__rating}></div>
      <button type="button" className={styles.assessmentCard__button}>
        Оценить
      </button>
    </div>
  );
}

export default AssessmentCard;
