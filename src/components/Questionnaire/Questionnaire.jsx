import SideMenu from '../SideMenu/SideMenu.jsx';
import './Questionnaire.scss';
import icon from '../../images/Questionnaire_user.svg';
import InputStars from '../InputStars/InputStars.js';
import '../InputStars/InputStars.scss';

function Questionnaire() {
  const name = 'Иван Иванов';
  const job = 'Разработчик';

  function handleSubmit(e) {
    e.preventDefault();
    console.log(e.target);
  }

  return (
    <div className="Questionnaire">
      <div className="Questionnaire__sidemenu">
        <SideMenu />
      </div>
      <div className="Questionnaire__wrapper">
        <div className="Questionnaire__header">
          <button className="Questionnaire-header__back-button">
            Назад к списку
          </button>
          {/* здесть прокинуть пропсом период оценки */}
          <span className="Questionnaire-header__data">
            Оценка работы за март
          </span>
          <img
            src={icon}
            alt="иконка с символическим изображением аватара пользователя"
            className="Questionnaire-header__icon"
          />
          <span className="Questionnaire-header__underscribe">{name}</span>
          <span className="Questionnaire-header__underscribe">&frasl;</span>
          <span className="Questionnaire-header__underscribe">{job}</span>
        </div>
        <div className="Questionnaire-titles">
          <span className="Questionnaire-titles__text">Критерии</span>
          <span>Оценка</span>
        </div>
        <form action="" onSubmit={(e) => handleSubmit(e)}>
          <div className="Questionnaire-container">
            <p className="Questionnaire__criterion">Погружается в проект</p>
            <div className="Questionnaire__value">
              {' '}
              <InputStars />
            </div>
            <p className="Questionnaire__criterion">Выполняет задачи</p>
            <div className="Questionnaire__value">
              {' '}
              <InputStars />
            </div>
            <p className="Questionnaire__criterion">Работает в команде</p>
            <div className="Questionnaire__value">
              {' '}
              <InputStars />
            </div>
            <p className="Questionnaire__criterion">Соблюдает дедлайны</p>
            <div className="Questionnaire__value">
              {' '}
              <InputStars />
            </div>
            <p className="Questionnaire__criterion">Расставляет приоритеты</p>
            <div className="Questionnaire__value">
              {' '}
              <InputStars />
            </div>
            <p className="Questionnaire__criterion">
              Умеет решать сложные задачи
            </p>
            <div className="Questionnaire__value">
              {' '}
              <InputStars />
            </div>
            <p className="Questionnaire__criterion">
              Ясно объясняет свои идеи команде
            </p>
            <div className="Questionnaire__value">
              {' '}
              <InputStars />
            </div>
            <p className="Questionnaire__criterion">
              Эффективно работает над несколькими задачами одновременно
            </p>
            <div className="Questionnaire__value">
              {' '}
              <InputStars />
            </div>
            <p className="Questionnaire__criterion">
              Воспринимает конструктивную критику
            </p>
            <div className="Questionnaire__value">
              {' '}
              <InputStars />
            </div>
            <p className="Questionnaire__criterion">
              Помогает коллегам с их задачами
            </p>
            <div className="Questionnaire__value">
              {' '}
              <InputStars />
            </div>
            <p className="Questionnaire__criterion">
              Запрашивает необходимую информацию и мнение коллег для решения
              совместных задач
            </p>
            <div className="Questionnaire__value">
              {' '}
              <InputStars />
            </div>
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

export default Questionnaire;
