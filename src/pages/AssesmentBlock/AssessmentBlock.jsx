import { useEffect, useState } from 'react';
import './AssessmentBlock.scss';
import icon from '../../images/assessmentBlock_icon.svg';
import AssessmentCard from '../../components/AssessmentCard/AssessmentCard.jsx';
import { checkActivitySurveyButton, doQuestionnaireSurvey, getAllUsers } from '../../utils/mainApi.js';

function AssessmentBlock() {
  const [users, setUsers] = useState([]);
  const [filterState, setFilterState] = useState('isAppreciated');
  const [isActivitySurveyButton, setIsActivitySurveyButton] = useState(false);

  useEffect(() => {
    checkActivitySurveyButton()
      .then((res) => {
        setIsActivitySurveyButton(res);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getAllUsers()
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
        getAllUsers()
        .then((res) => {
          setUsers(res);
        })
        .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
      // ответ
      // {
      //   "id": 7,
      //   "author": {
      //     "id": 19,
      //     "fullName": "вап",
      //     "nickName": null,
      //     "city": null,
      //     "email": "qw@qw.qw",
      //     "birthday": null,
      //     "role": "ROLE_ADMIN",
      //     "position": null,
      //     "department": null
      //   },
      //   "created": "2024-04-05",
      //   "criterias": [
      //     {
      //       "id": 5,
      //       "name": " Расставляет приоритеты",
      //       "isDefault": true
      //     },
      //     {
      //       "id": 20,
      //       "name": "Любит рыбалку",
      //       "isDefault": false
      //     }
      //   ],
      //   "status": "SHARED"
      // }
  }

  console.log(users);

  return (
    <section className="AssessmentBlock">
      <div className="AssessmentBlock__container">
        <div className="AssessmentBlock__header">
          <div className="header__wrapper">
            <img
              src={icon}
              alt="иконка изображает лист бумаги и ручку"
              className="header__icon"
            />
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
            className={
              filterState !== 'isAppreciated'
                ? 'filters__items filters__button'
                : 'filters__items filters__button filters__button_active'
            }
            id="isAppreciated"
            onClick={(e) => handleChangeFilterState(e)}
          >
            Оценить
          </button>
          <button
            className={
              filterState === 'isAppreciated'
                ? 'filters__items filters__button filters__button_done'
                : 'filters__items filters__button filters__button_done filters__button_active'
            }
            id="isAppreciated_done"
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
        ) : filterState === 'isAppreciated' && (
          <ul className="AssessmentBlock__list">
            {users.map((user) => (
              <AssessmentCard
                key={user.id}
                fullName={user.fullName}
                position={user.position}
                status="isAppreciated"
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default AssessmentBlock;
