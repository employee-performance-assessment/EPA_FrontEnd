import { useState } from 'react';
import './AssessmentBlock.scss';
import icon from '../../images/assessmentBlock_icon.svg';
import image from '../../images/assessmentBlock_image.svg';
import AssessmentCard from '../../components/AssessmentCard/AssessmentCard.jsx';
import PeriodDatePicker from '../../components/PeriodDatePicker/PeriodDatePicker.jsx';
// import { getAllUsers } from '../../utils/mainApi.js';
// import { addNewQuestionare } from '../../utils/adminQuestionareApi.js';

function AssessmentBlock() {
  // по клику на кнопку осуществится переход к анкете
  // const [users, setUsers] = useState([]);
  const [filterState, setFilterState] = useState('asses');
  // useEffect(() => {
  //   getAllUsers()
  //     .then((res) => {
  //       setUsers(res);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  function handleClick() {
    // addNewQuestionare().then((res)=> console.log(res));
  }
  function handleChangeFilterState(e) {
    setFilterState(e.target.id);
  }

  const data = [
    { id: 1, name: 'Василий', job: 'тестировщик' },
    { id: 2, name: 'Петр', job: 'фронт' },
    { id: 3, name: 'Мария', job: 'бэк' },
    { id: 4, name: 'Иван', job: 'дизвйнер' },
  ];
  const data2 = [
    { id: 4, name: 'Иван', job: 'дизвйнер' },
    { id: 3, name: 'Мария', job: 'бэк' },
    { id: 2, name: 'Петр', job: 'фронт' },
    { id: 1, name: 'Василий', job: 'тестировщик' },
  ];

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
            className={
              data.length === 0 ? 'header__button' : 'header__button_empty'
            }
            onClick={() => handleClick()}
          >
            Провести анкетирование
          </button>
        </div>
        <div className="AssessmentBlock__filters">
          <h3 className="filters__text">Фильтры:</h3>
          <button
            className="filters__items filters__button"
            id="asses"
            onClick={(e) => handleChangeFilterState(e)}
          >
            Оценить
          </button>
          <button
            className="filters__items filters__button filters__button_done"
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
          <form className="filters__items filters__calendar">
            <PeriodDatePicker />
          </form>
        </div>
        {data.length === 0 ? (
          <>
            <img
              src={image}
              alt="картинка фона с изображением человека"
              className="AssessmentBlock__immage"
            />
            <span className="AssessmentBlock__span">
              <p className="">Список пока что пуст.</p>Новые карточки для оценки
              сотрудников можете добавить с помощью кнопки «Провести
              анкетирование»
            </span>
          </>
        ) : filterState === 'asses' ? (
          <ul className="AssessmentBlock__list">
            {data.map((i) => (
              <AssessmentCard key={i.id} name={i.name} job={i.job} />
            ))}
          </ul>
        ) : (
          <ul className="AssessmentBlock__list">
            {data2.map((i) => (
              <AssessmentCard key={i.id} name={i.name} job={i.job} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default AssessmentBlock;
