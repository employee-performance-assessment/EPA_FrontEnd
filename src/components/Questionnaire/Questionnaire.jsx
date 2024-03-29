import SideMenu from '../SideMenu/SideMenu.jsx';
import './Questionnaire.scss';
import icon from '../../images/Questionnaire_user.svg';

function Questionnaire() {
  const name = 'Иван Иванов';
  const job = 'Разработчик';

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
          <span className='Questionnaire-titles__text'>Критерии</span>
          <span>Оценка</span>
        </div>
        <div className="Questionnaire-container">
          <form action=""></form>
        </div>
      </div>
    </div>
  );
}

export default Questionnaire;
