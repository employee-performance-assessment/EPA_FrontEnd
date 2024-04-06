import { useEffect, useState } from 'react';
import AssessmentCard from '../../components/AssessmentCard/AssessmentCard.jsx';
import {
  checkActivitySurveyButton,
  doQuestionnaireSurvey,
  getEvaluationsList
} from '../../utils/mainApi.js';
import './AssessmentBlock.scss';

function AssessmentBlock() {
  const [users, setUsers] = useState([]);
  const [filterState, setFilterState] = useState('asses');
  const [isActivitySurveyButton, setIsActivitySurveyButton] = useState(false);

  useEffect(() => {
    checkActivitySurveyButton()
      .then((res) => {
        setIsActivitySurveyButton(res);
      })
      .catch((err) => console.log(err));

    getEvaluationsList()
      .then((res) => {
        setUsers(res);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleChangeFilterState(e) {
    setFilterState(e.target.id);
  }

  function handleClickSurveyButton() {
    doQuestionnaireSurvey()
      .then(() => {
        getEvaluationsList()
          .then((res) => {
            setUsers(res);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  return (
    <section className="AssessmentBlock">
      <div className="AssessmentBlock__container">
        <div className="AssessmentBlock__header">
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
        <div className="AssessmentBlock__filters">
          <h3 className="filters__text">Фильтры:</h3>
          <button
            className={`filters__items filters__button
            ${filterState === 'asses' && 'filters__button_active'}`}
            id="asses"
            onClick={(e) => handleChangeFilterState(e)}
          >
            Оценить
          </button>
          <button
            className={`filters__items filters__button filters__button_done
            ${filterState !== 'asses' && 'filters__button_active'}`}
            id="asses_done"
            onClick={(e) => handleChangeFilterState(e)}
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
        {users.length === 0 ? (
          <>
            <div className="AssessmentBlock__image" />
            <span className="AssessmentBlock__span">
              <p className="">Список пока что пуст.</p>Новые карточки для оценки
              сотрудников можете добавить с помощью кнопки «Провести
              анкетирование»
            </span>
          </>
        ) : filterState === 'asses' && (
          <ul className="AssessmentBlock__list">
            {users.map((user) => (
              <AssessmentCard
                key={user.employeeId}
                fullName={user.employeeFullName}
                position={user.employeePosition}
                date={user.questionnaireCreated}
                questionnaireId={user.questionnaireId}
                employeeId={user.employeeId}
                status="asses"
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default AssessmentBlock;
