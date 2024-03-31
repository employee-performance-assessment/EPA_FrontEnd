import './NotProject.scss';
import empty from '../../images/about-our-team.svg';
import pencilSimple from '../../images/PencilSimple.svg';
import trashSimple from '../../images/TrashSimple.svg';

export function NotProject() {
  return <div className="not-project">
    <h1 className="not-project__title">У вас ещё нет проектов. Создайте свой первый проект.</h1>
    <img className="not-project__img" src={empty} alt="отсутствуют задания" />
    <div className='not-project__input-conteiner'>
      <input type='text ' className="not-project__input" placeholder='Название проекта' />
      <img className="not-project__img-pen" src={pencilSimple} alt="создать проект" />
      <img className="not-found-task__img" src={trashSimple} alt="очистить поле" />
    </div>
    <button className='not-project__button not-project__button_purple'>Подтвердить</button>
  </div>;
}
