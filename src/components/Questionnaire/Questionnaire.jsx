import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import InputStars from '../InputStars/InputStars.js';
import { getCurrentUser, getQuestionnaire, postEvaluationsList } from '../../utils/mainApi.js';
import { ENDPOINT_ROUTES } from '../../constants/constantsEndpointRoute.js';
import { useFormValidation } from '../../hooks/useFormValidation';
import './Questionnaire.scss';

export default function Questionnaire() {
  const [criteria, setCriteria] = useState([]);
  const [isActiveButton, setIsActiveButton] = useState(false);
  const { values, handleChange, } = useFormValidation();
  const [user, setUser] = useState({ fullName: '', position: '' });
  const { estimate } = ENDPOINT_ROUTES;
  const navigate = useNavigate();

  const params = useParams();
  const { date, questionnaireId, employeeId } = params;

  useEffect(() => {
    handleActiveButtonSubmit();
  }, [values, criteria])

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

  function handleActiveButtonSubmit() {
    const objectKeys = Object.keys(values);
    const lengthValues = objectKeys.length;
    const lengthCriteria = criteria.length;

    if (lengthCriteria + 1 === lengthValues && values['recommendations']) {
      setIsActiveButton(true);
    } else {
      setIsActiveButton(false);
    }
  }

  function GoBack() {
    navigate(estimate);
  }

  function transformValues() {
    const resultArr = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const key in values) {
      if (values[key] && key !== 'recommendations') {
        resultArr.push({
          criteriaId: Number(key),
          score: Number(values[key])
        });
      }
    }
    return resultArr;
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const recommendationValue = evt.target[0].value;
    const resultData = {
      questionnaireId,
      evaluatedId: employeeId,
      questionnaireData: {
        evaluationDtoList: transformValues(),
        recommendation: recommendationValue,
      }
    }

    postEvaluationsList(resultData)
      .then(() => {
        navigate(estimate);
      })
      .catch((err) => console.log(err));
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
          <span className="Questionnaire-header__data">{date}</span>
          <div className="Questionnaire-header__icon" />
          <span className="Questionnaire-header__underscribe">{user.fullName}</span>
          <span className="Questionnaire-header__underscribe">&frasl;</span>
          <span className="Questionnaire-header__underscribe">{user.position}</span>
        </div>
        <div className="Questionnaire-titles">
          <span className="Questionnaire-titles__text">Критерии</span>
          <span>Оценка</span>
        </div>
        <div className="Questionnaire-container">
          {criteria.map((criterion) => (
            <div className="Questionnaire__criterion" key={criterion.id}>
              <p className="Questionnaire__criterion-name">{criterion.name}</p>
              <div className="Questionnaire__criterion-value">
                <InputStars handleChange={handleChange} name={criterion.id} />
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <span className="Questionaire__text">
            Рекомендации для сотрудника
          </span>
          <textarea
            name="recommendations"
            type="text"
            className="Questionnaire__input-text"
            placeholder="Ваши комментарии"
            onChange={handleChange}
            value={values['recommendations'] || ''}
          />
          <button
            className={`Questionnaire__button ${isActiveButton && 'Questionnaire__button_active'}`}
            type="submit">
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
}
