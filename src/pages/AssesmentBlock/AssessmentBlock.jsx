import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AssessmentCard from '../../components/AssessmentCard/AssessmentCard.jsx';
import { setIsAppreciated } from '../../store/slices/isAppreciatedSlices.js';
import {
  checkActivitySurveyButton,
  doQuestionnaireSurvey,
  getListComplitedQuestionnaires,
  getListNewQuestionnaires
} from '../../utils/mainApi.js';
import './AssessmentBlock.scss';

function AssessmentBlock() {
  const isAppreciated = useSelector((state) => state.isAppreciated.isAppreciated);
  const [users, setUsers] = useState([]);
  const [isActivitySurveyButton, setIsActivitySurveyButton] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    checkActivitySurveyButton()
      .then((res) => {
        setIsActivitySurveyButton(res);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (isAppreciated) {
      getListNewQuestionnaires()
        .then((res) => {
          setUsers(res);
        })
        .catch((err) => console.log(err));
    } else {
      getListComplitedQuestionnaires()
        .then((res) => {
          setUsers(res);
        })
        .catch((err) => console.log(err));
    }
  }, [isAppreciated])

  function handleChangeFilterState(e) {
    if (e.target.id === 'isAppreciated') {
      localStorage.setItem('isAppreciated', true)
      dispatch(setIsAppreciated(true));
    } else {
      localStorage.setItem('isAppreciated', false);
      dispatch(setIsAppreciated(false));
    }
  }

  function handleClickSurveyButton() {
    doQuestionnaireSurvey()
      .then(() => {
        getListNewQuestionnaires()
          .then((res) => {
            setUsers(res);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  return (
    <section className="assessment-block">
      <div className="assessment-block__container">
        <div className="assessment-block__header">
          <div className="header__wrapper">
            <div className="header__icon" />
            <h3 className="header__text">Оценка эффективности сотрудников</h3>
          </div>
          <button
            className={`header__button ${!isActivitySurveyButton && 'header__button_inactive'}`}
            onClick={handleClickSurveyButton}
            disabled={!isActivitySurveyButton}
          >
            Провести анкетирование
          </button>
        </div>
        <div className="assessment-block__filters">
          <h3 className="filters__text">Фильтры:</h3>
          <button
            className={`filters__items filters__button
            ${isAppreciated && 'filters__button_active'}`}
            id="isAppreciated"
            onClick={handleChangeFilterState}
          >
            Оценить
          </button>
          <button
            className={`filters__items filters__button filters__button_done
            ${!isAppreciated && 'filters__button_active'}`}
            id="isAppreciated_done"
            onClick={handleChangeFilterState}
          >
            Оценка поставлена
          </button>
          <input
            type="text"
            placeholder="Поиск"
            className="filters__items filters__search"
          />
          <form className="filters__items filters__calendar">Календарь</form>
        </div>
        {users.length === 0 && isActivitySurveyButton && (
          <>
            <div className="assessment-block__image_empty" />
            <span className="assessment-block__span">
              <p className="">Список пока что пуст.</p>Новые карточки для оценки
              сотрудников можете добавить с помощью кнопки «Провести
              анкетирование»
            </span>
          </>
        )}
        {users.length === 0 && !isActivitySurveyButton && (
          <>
            <div className="assessment-block__image_done" />
            <span className="assessment-block__span">
              <p className="">Спасибо за ваше мнение!</p>Новые карточки для оценки
              сотрудников можете добавить с помощью кнопки «Провести
              анкетирование»
            </span>
          </>
        )}
        <ul className="assessment-block__list">
          {users.map((user) => (
            <AssessmentCard
              key={user.employeeId + user.questionnaireId}
              fullName={user.employeeFullName}
              position={user.employeePosition}
              date={user.questionnaireCreated}
              questionnaireId={user.questionnaireId}
              employeeId={user.employeeId}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default AssessmentBlock;
