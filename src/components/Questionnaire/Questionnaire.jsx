import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import InputStars from '../InputStars/InputStars.js';
import { getCurrentUser, getQuestionnaire } from '../../utils/mainApi.js';
import { ENDPOINT_ROUTES } from '../../constants/constantsEndpointRoute.js';
import './Questionnaire.scss';

export default function Questionnaire() {
  const { estimate } = ENDPOINT_ROUTES;
  const [criteria, setCriteria] = useState([]);
  const [user, setUser] = useState({ fullName: '', position: '' });
  const navigate = useNavigate();

  const params = useParams();
  const { monthName, questionnaireId, employeeId } = params;

  useEffect(() => {
    getQuestionnaire(questionnaireId)
      .then((res) => {
        setCriteria(res.criterias);
      })
      .catch((err) => console.log(err));

    getCurrentUser(employeeId)
      .then((res) => {
        setUser({
          fullName: res.fullName,
          position: res.position
        });
      })
      .catch((err) => console.log(err));
  }, []);


  function GoBack() {
    navigate(estimate);
  }

  function handleChange() {
    // console.log(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

  }

  return (
    <div className="Questionnaire">
      <div className="Questionnaire__wrapper">
        <div className="Questionnaire__header">
          <button
            type="button"
            className="Questionnaire-header__back-button"
            onClick={GoBack}
          >
            Назад к списку
          </button>
          <span className="Questionnaire-header__data">
            Оценка работы за {monthName}
          </span>
          <div className="Questionnaire-header__icon" />
          <span className="Questionnaire-header__underscribe">{user.fullName}</span>
          <span className="Questionnaire-header__underscribe">&frasl;</span>
          <span className="Questionnaire-header__underscribe">{user.position}</span>
        </div>
        <div className="Questionnaire-titles">
          <span className="Questionnaire-titles__text">Критерии</span>
          <span>Оценка</span>
        </div>
        <form action="" onSubmit={(e) => handleSubmit(e)}>
          <div className="Questionnaire-container">
            {criteria.map((item) => (
              <>
                <p className="Questionnaire__criterion">{item.name}</p>
                <div className="Questionnaire__value">
                  <InputStars handleChange={handleChange} name={item.name} />
                </div>
              </>
            ))}
          </div>
          <span className="Questionaire__text">
            Рекомендации для сотрудника
          </span>
          <textarea
            type="text"
            className="Questionnaire__input-text"
            placeholder="Ваши комментарии"
          />
          <button className="Questionnaire__button">Отправить</button>
        </form>
      </div>
    </div>
  );
}
