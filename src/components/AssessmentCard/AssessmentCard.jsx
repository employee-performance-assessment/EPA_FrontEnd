// import { useNavigate } from 'react-router';
// import { ENDPOINT_ROUTES } from '../../constants/constantsEndpointRoute.js';
import styles from './AssessmentCard.module.scss';
import './AssessmentCard.css';
import Questionnaire from '../Questionnaire/Questionnaire.jsx';

function AssessmentCard({ name, job, status }) {
  // const navigate = useNavigate();
  // const { questionnaire } = ENDPOINT_ROUTES;

  function handleClick(name, job) {
    return <Questionnaire job={job} name={name} />;
  }

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
        onClick={() => handleClick(name, job)}
      >
        {status === 'asses' ? 'Оценить' : 'Отправлено'}
      </button>
    </div>
  );
}

export default AssessmentCard;
