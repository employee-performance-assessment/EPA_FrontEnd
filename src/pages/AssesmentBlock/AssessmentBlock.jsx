import { useState } from 'react';
import SideMenu from '../../components/SideMenu/SideMenu.jsx';
import './AssessmentBlock.scss';
import icon from '../../images/assessmentBlock_icon.svg';
import image from '../../images/assessmentBlock_image.svg';
import AssessmentCard from '../../components/AssessmentCard/AssessmentCard.jsx';

function AssessmentBlock() {
  // по клику на кнопку осуществится переход к анкете
  // const [data, setData] = useState({});
  const [filterState, setFilterState] = useState('asses');
  const data = [
    {
      id: 0,
      name: 'Creola Katherine Johnson',
      job: 'mathematician',
    },
    {
      id: 1,
      name: 'Mario José Molina-Pasquel Henríquez',
      job: 'chemist',
    },
    {
      id: 2,
      name: 'Mohammad Abdus Salam',
      job: 'physicist',
    },
    {
      id: 3,
      name: 'Percy Lavon Julian',
      job: 'chemist',
    },
    {
      id: 4,
      name: 'Subrahmanyan Chandrasekhar',
      job: 'astrophysicist',
    },
  ];
  const data2 = [
    {
      id: 0,
      name: 'Creola',
      job: 'chemist',
    },
    {
      id: 1,
      name: 'Mario José Molina-Pasquel Henríquez',
      job: 'chemist',
    },
    {
      id: 2,
      name: 'Mohammad Abdus Salam',
      job: 'physicist',
    },
    {
      id: 3,
      name: 'Percy Lavon Julian',
      job: 'chemist',
    },
    {
      id: 4,
      name: 'Subrahmanyan Chandrasekhar',
      job: 'astrophysicist',
    },
  ];
  function handleClick() {}
  function handleChangeFilterState(e) {
    setFilterState(e.target.id);
  }

  return (
    <section className="AssessmentBlock">
      <SideMenu />
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
          <button className="header__button" onClick={() => handleClick()}>
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
          <form className="filters__items filters__calendar">Календарь</form>
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
              <>
                <AssessmentCard key={i.id} name={i.name} job={i.job} />
              </>
            ))}
          </ul>
        ) : (
          <ul className="AssessmentBlock__list">
            {data2.map((i) => (
              <>
                <AssessmentCard key={i.id} name={i.name} job={i.job} />
              </>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default AssessmentBlock;
