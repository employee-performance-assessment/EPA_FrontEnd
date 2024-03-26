import SideMenu from '../../components/SideMenu/SideMenu.jsx';
import './AssessmentBlock.scss';
import icon from '../../images/assessmentBlock_icon.svg';
import image from '../../images/assessmentBlock_image.svg';

function AssessmentBlock() {
  // по клику на кнопку осуществится переход к анкете
  function handleClick() {}

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
          <button className="filters__items filters__button">Оценить</button>
          <div className="filters__items filters__window">
            Оценка поставлена
          </div>
          <input
            type="text"
            placeholder="Поиск"
            className="filters__items filters__search"
          />
          <form className="filters__items filters__calendar">Календарь</form>
        </div>
        <img
          src={image}
          alt="картинка фона с изображением человека"
          className="AssessmentBlock__immage"
        />
        <span className="AssessmentBlock__span">
          <p className="">Список пока что пуст.</p>Новые карточки для оценки
          сотрудников можете добавить с помощью кнопки «Провести анкетирование»
        </span>
      </div>
    </section>
  );
}

export default AssessmentBlock;
