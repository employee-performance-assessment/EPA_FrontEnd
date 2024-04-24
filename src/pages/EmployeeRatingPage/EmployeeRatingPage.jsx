import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import EmployeeViewCriteria from '../../components/EmployeeViewCriteria/EmployeeViewCriteria.jsx';
import SetStars from '../../components/SetStars/SetStars.js';
import InfoPopup from '../../components/InfoPopup/InfoPopup.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import {
  getEvaluationsByAdmin,
  getEvaluationsByUser,
} from '../../utils/mainApi.js';
import { useErrorHandler } from '../../hooks/useErrorHandler.js';
import useLoading from '../../hooks/useLoader.js';
import { getFromLocalStorage } from '../../utils/localStorageFunctions.js';
import styles from './EmployeeRatingPage.module.scss';

function EmployeeRatingPage() {
  const [recommendation, setRecommendation] = useState('');
  const [rating, setRating] = useState(0);
  const [date, setDate] = useState('');
  const [criteria, setCriteria] = useState([]);

  const navigate = useNavigate();
  const { employeeId, questionnaireId } = useParams();
  const user = getFromLocalStorage('user');
  const { popupText, isPopupOpen, handleError, closePopup } = useErrorHandler();
  const { isLoading, setLoading } = useLoading();

  function handleClickBack() {
    navigate(-1);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let data;

        if (employeeId && user.isAdmin) {
          data = await getEvaluationsByAdmin(employeeId, questionnaireId);
        } else {
          data = await getEvaluationsByUser(questionnaireId);
        }
        setRating(data.middleScore);
        setRecommendation(data.recommendation);
        const initialDate = data.createQuestionnaire
          .split('-')
          .reverse()
          .join('.');
        setDate(initialDate);
        const initialCriteria = data.evaluations;
        setCriteria(
          Array.from(
            Object.keys(initialCriteria).map((key, index) => {
              const output = {
                id: index + 1, // Уникальный идентификатор, начинаем с 1
                adminScore: initialCriteria[key].adminScore,
                colleaguesScore: initialCriteria[key].colleaguesScore,
                text: key, // Текст берем из ключа объекта
              };
              return output;
            })
          )
        );
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {isPopupOpen && (
        <InfoPopup text={popupText} handleClosePopup={closePopup} />
      )}
      <section className={styles.employeeRatingPage__container}>
        <div className={styles.employeeRatingPage__header}>
          <div className={styles.employeeRatingPage__row}>
            <button
              type="button"
              onClick={handleClickBack}
              className={styles.employeeRatingPage__back}
            >
              <div className={styles.employeeRatingPage__icon} />
              <p className={styles.employeeRatingPage__caption}>Назад </p>
            </button>
            <h2 className={styles.employeeRatingPage__title}>{date}</h2>
          </div>
          <div className={styles.employeeRatingPage__score}>
            <SetStars
              rating={rating}
              starOut={styles.employeeRatingPage__star_out}
              starIn={styles.employeeRatingPage__star_in}
            />
          </div>
        </div>
        <div className={styles.employeeRatingPage__block}>
          <div className={styles.employeeRatingPage__criteria}>
            <p />
            <h3>От руководителя</h3>
            <h3>От коллег</h3>
          </div>
          <ul className={styles.employeeRatingPage__list}>
            {criteria.map((card) => (
              <EmployeeViewCriteria
                key={card.id}
                text={card.text}
                adminScore={card.adminScore}
                colleaguesScore={card.colleaguesScore}
              />
            ))}
          </ul>

          <h3 className={styles.employeeRatingPage__recoTitle}>
            Рекомендации для сотрудника
          </h3>
          <div className={styles.employeeRatingPage__recoText}>
            <p>{recommendation || 'Рекомендаций пока нет'}</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default EmployeeRatingPage;
