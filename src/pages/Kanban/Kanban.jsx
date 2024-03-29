/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import SideMenu from '../../components/SideMenu/SideMenu.jsx';
import Boards from '../../components/Boards/Boards.jsx';
import { NotFoundTask } from '../../components/NotFoundTask/NotFoundTask.jsx';
import { NotProject } from '../../components/NotProject/NotProject.jsx';
import { PopupKanban } from '../../components/PopupKanban/PopupKanban.jsx';
import plus from '../../images/Plus.svg';
import edit from '../../images/edit-button-icon.svg';
import caretDown from '../../images/CaretDown_black.svg';
import { boardsList } from '../../constants/boardsList.js';
import './Kanban.scss';

function Kanban() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn.isLoggedIn);
  const [isEmpty, setIsEmpty] = useState(1);
  const [isOpenPopup, setIsOpenPopup] = useState(true);

  const nameProject = 'Linkpass';
  const nameNotActivProject = 'ByteBoost';
  const numberProjects = '3';
  return isLoggedIn ? (
    <section className="kanban_page">
      <div className="kanban__wrapper">
        <div className="kanban__sidemenu">
          <SideMenu />
        </div>
        <div className="kanban__main">
          <nav className="kanban__nav">
            <p className="kanban__label">Проект:</p>
            <button
              type="button"
              className="kanban__button kanban__button_border"
            >
              {nameProject}
            </button>
            <button
              type="button"
              className="kanban__button kanban__button_non-border"
            >
              {nameNotActivProject}
            </button>
            <button
              type="button"
              className="kanban__button kanban__button_more"
            >
              ...ещё {numberProjects}
              <img src={caretDown} alt="Раскрыть список проектов" />
            </button>
            <button
              type="button"
              className="kanban__button kanban__button_purple"
            >
              <p className="kanban__button-title_all">Все</p>
            </button>
            <button type="button" className="kanban__button kanban__button">
              Проекты <img src={edit} alt="Редактировать проект" />
            </button>
            <button
              type="button"
              className="kanban__button kanban__button_purple kanban__button_task"
            >
              <p className="kanban__button-title_make">Создать задачу</p>
              <img
                className="kanban__button-img"
                src={plus}
                alt="Добавить новую задачу"
              />
            </button>
          </nav>
          <Boards boardsList={boardsList} />
          {isEmpty !== 0 ? <NotFoundTask /> : <NotProject />}
        </div>
      </div>
      {isOpenPopup && <PopupKanban />}
    </section>
  ) : (
    ''
  );
}

export default Kanban;
