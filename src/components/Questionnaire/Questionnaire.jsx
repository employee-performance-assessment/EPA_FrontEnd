import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import InputStars from '../InputStars/InputStars.js';
import SetStars from '../SetStars/SetStars.js';
import InfoPopup from "../InfoPopup/InfoPopup.jsx";
import Loader from '../Loader/Loader.jsx';
import { useFormValidation } from '../../hooks/useFormValidation';
import { setIsAppreciated } from '../../store/slices/isAppreciatedSlices.js';
import { useErrorHandler } from '../../hooks/useErrorHandler.js';
import useLoading from '../../hooks/useLoader.js';
import {
  getCurrentUser,
  getEvaluationsList,
  getQuestionnaire,
  postEvaluationsList
} from '../../utils/mainApi.js';
import { ENDPOINT_ROUTES } from '../../constants/constantsEndpointRoute.js';
import {
  ADMIN_ASSESSED,
  ADMIN_EVALUATIONS,
  USER_EVALUATIONS,
  USER_EVALUATIONS_ASSESSED
} from '../../constants/constantAPI.js';
import './Questionnaire.scss';

export default function Questionnaire() {
  const [criteria, setCriteria] = useState([]);
  const [isActiveButton, setIsActiveButton] = useState(false);
  const [user, setUser] = useState({ fullName: '', position: '' });

  const isAdmin = useSelector((state) => state.user.isAdmin);
  const isAppreciated = useSelector((state) => state.isAppreciated.isAppreciated);
  const { values, handleChange, } = useFormValidation();
  const { popupText, isPopupOpen, handleError, closePopup } = useErrorHandler();
  const { isLoading, setLoading } = useLoading();

  const { estimate } = ENDPOINT_ROUTES;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();
  const { date, questionnaireId, employeeId } = params;

  if (localStorage.getItem('isAppreciated')) {
    dispatch(setIsAppreciated(JSON.parse(localStorage.getItem('isAppreciated'))));
  }

  useEffect(() => {
    handleActiveButtonSubmit();
  }, [values, criteria])

  useEffect(() => {
    setLoading(true);
    if (isAppreciated) {
      getQuestionnaire(questionnaireId)
        .then((res) => {
          setCriteria(res.criterias);
        })
        .catch((err) => handleError(err))
        .finally(() => setLoading(false));
    } else {
      const path = isAdmin ? ADMIN_ASSESSED : USER_EVALUATIONS_ASSESSED;

      getEvaluationsList(path, questionnaireId, employeeId)
        .then((res) => {
          setCriteria(isAdmin ? res.adminEvaluations : res);
          values['recommendation'] = res.recommendation;
        })
        .catch((err) => handleError(err))
        .finally(() => setLoading(false));
    }
  }, [])

  useEffect(() => {
    setLoading(true);
    getCurrentUser(employeeId)
      .then((res) => {
        setUser({
          fullName: res.fullName,
          position: res.position
        });
      })
      .catch((err) => handleError(err))
      .finally(() => setLoading(false));
  }, []);

  function handleActiveButtonSubmit() {
    const objectKeys = Object.keys(values);
    const lengthValues = objectKeys.length;
    const lengthCriteria = criteria.length;

    if (isAdmin) {
      lengthCriteria + 1 === lengthValues && values['recommendation'] ?
        setIsActiveButton(true) :
        setIsActiveButton(false);
    } else {
      lengthCriteria === lengthValues ?
        setIsActiveButton(true) :
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
      if (values[key] && key !== 'recommendation') {
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
    setLoading(true);
    const recommendationValue = evt.target[0].value;
    const path = isAdmin ? ADMIN_EVALUATIONS : USER_EVALUATIONS;

    const dataAdmin = {
      evaluationDtoList: transformValues(),
      recommendation: recommendationValue,
    }

    const dataUser = transformValues();

    const resultData = isAdmin ? dataAdmin : dataUser;

    postEvaluationsList(
      path,
      questionnaireId,
      employeeId,
      resultData
    )
      .then(() => {
        navigate(estimate);
      })
      .catch((err) => handleError(err))
      .finally(() => setLoading(false));
  }

  return (
    <div className="questionnaire">
      {isLoading && <Loader />}
      {isPopupOpen && <InfoPopup text={popupText} handleClosePopup={closePopup} />}
      <div className="questionnaire__wrapper">
        <div className="questionnaire__header">
          <div className="questionnaire-header__container">
            <button
              type="button"
              className="questionnaire-header__back-button"
              onClick={GoBack}
            >
              Назад к списку
            </button>
            <span className="questionnaire-header__data">{date}</span>
          </div>
          <div className="questionnaire-header__container-underscribe">
            <div className="questionnaire-header__icon" />
            <span className="questionnaire-header__underscribe">{user.fullName}</span>
            <span className="questionnaire-header__underscribe">/</span>
            <span className="questionnaire-header__underscribe">{user.position}</span>
          </div>
        </div>
        <div className="questionnaire-titles">
          <span className="questionnaire-titles__text">Критерии</span>
          <span>Оценка</span>
        </div>
        <div className="questionnaire-container">
          {criteria.map((criterion) => (
            <div className="questionnaire__criterion" key={criterion.id + criterion.name}>
              <p className="questionnaire__criterion-name">{criterion.name}</p>
              <div className="questionnaire__criterion-value">
                {isAppreciated ?
                  <InputStars handleChange={handleChange} name={criterion.id} /> :
                  <SetStars
                    rating={criterion.score}
                    starOut="questionnaire__star_out"
                    starIn="questionnaire__star_in" />}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="questionnaire__form">
          {isAdmin && <>
            <span className="questionnaire__text">
              Рекомендации для сотрудника
            </span><textarea
              name="recommendation"
              type="text"
              className="questionnaire__input-text"
              placeholder="Ваши комментарии"
              onChange={handleChange}
              value={values['recommendation'] || ''}
              disabled={!isAppreciated} />
          </>}
          {isAppreciated && <button
            className={`questionnaire__button ${isActiveButton && 'questionnaire__button_active'}`}
            type="submit">
            Отправить
          </button>}
        </form>
      </div>
    </div>
  );
}
