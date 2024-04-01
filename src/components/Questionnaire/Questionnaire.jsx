import { useNavigate } from 'react-router';
import SideMenu from '../SideMenu/SideMenu.jsx';
import './Questionnaire.scss';
import icon from '../../images/Questionnaire_user.svg';
import InputStars from '../InputStars/InputStars.js';
import '../InputStars/InputStars.scss';

function Questionnaire() {
  // передать пропсами кого оцениваем
  const name = 'Иван Иванов';
  const job = 'Разработчик';

  const list = [
    'Погружается в проект',
    'Выполняет задачи',
    'Работает в команде',
    'Соблюдает дедлайны',
    'Расставляет приоритеты',
    ' Умеет решать сложные задачи',
    'Ясно объясняет свои идеи команде',
    'Эффективно работает над несколькими задачами одновременно',
    'Воспринимает конструктивную критику',
    'Помогает коллегам с их задачами',
    'Запрашивает необходимую информацию и мнение коллег для решения совместных задач',
    'Рекомендации для сотрудника',
  ];

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    console.log(e.target);
  }
  function GoBack() {
    navigate('/estimate');
  }

  return (
    <div className="Questionnaire">
      <div className="Questionnaire__sidemenu">
        <SideMenu />
      </div>
      <div className="Questionnaire__wrapper">
        <div className="Questionnaire__header">
          <button
            className="Questionnaire-header__back-button"
            onClick={() => GoBack()}
          >
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
            {list.map((item) => (
              <>
                <p className="Questionnaire__criterion">{item}</p>
                <div className="Questionnaire__value">
                  <InputStars />
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

export default Questionnaire;
