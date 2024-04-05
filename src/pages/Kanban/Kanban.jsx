/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Boards from '../../components/Boards/Boards.jsx';
import { NotFoundTask } from '../../components/NotFoundTask/NotFoundTask.jsx';
import { NotProject } from '../../components/NotProject/NotProject.jsx';
import { PopupKanban } from '../../components/PopupKanban/PopupKanban.jsx';
// import { PopupEditTask } from '../../components/PopupEditTask/PopupEditTask.jsx';
import plus from '../../images/Plus.svg';
import edit from '../../images/edit-button-icon.svg';
import caretDown from '../../images/CaretDown_black.svg';
import { boardsListEmpty } from '../../constants/boardsList.js';
import { getProjectsName } from '../../utils/mainApi.js';
import './Kanban.scss';

function Kanban() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn.isLoggedIn);
  const [isEmpty, setIsEmpty] = useState(1);
  const [isNoProject, setIsNoProject] = useState(true);
  const [isNoTask, setIsNoTask] = useState(true);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (projects.length > 0) {
      setIsNoProject(false);
    } else {
      setIsNoProject(true);
    }
  }, [projects]);

  useEffect(() => {
    getProjectsName()
      .then((res) => {
        setProjects(res);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleClickOpenPopup() {
    setIsOpenPopup(true);
  }

  function handleClickViewAllTask() {
    console.log('показать все таски');
  }

  return isLoggedIn ? (
    <section className="kanban_page">
      <div className="kanban__main">
        <nav className="kanban__nav">
          <div className="kanban__container-project">
            <p className="kanban__label">Проект:</p>
            {projects[0] && (
              <button
                type="button"
                className="kanban__button kanban__button_border"
              >
                {projects[0].name}
              </button>
            )}
            {projects[1] && (
              <button
                type="button"
                className="kanban__button kanban__button_non-border"
              >
                {projects[1].name}
              </button>
            )}
          </div>
          <div className="kanban__container-project">
            <button
              type="button"
              className="kanban__button kanban__button_more"
            >
              <p className="kanban__button-title">
                ...ещё {projects.length > 2 && projects.length - 2}
              </p>
              <img src={caretDown} alt="Раскрыть список проектов" />
            </button>
            <button
              type="button"
              className={`kanban__button ${projects.length < 1 ? 'kanban__button_grey' : 'kanban__button_purple'} kanban__button_all`}
              onClick={handleClickViewAllTask}
              disabled={projects.length < 1}
            >
              <p className="kanban__button-title_all">Все</p>
            </button>
            <button
              type="button"
              className="kanban__button kanban__button_project"
              onClick={handleClickOpenPopup}
            >
              <p className="kanban__button-title_make">Проекты</p>{' '}
              <img src={edit} alt="Редактировать проект" />
            </button>
            <button
              type="button"
              className={`kanban__button ${projects.length < 1 ? 'kanban__button_grey' : 'kanban__button_purple'} kanban__button_task`}
              disabled={projects.length < 1}
            >
              <p className="kanban__button-title_make">Создать задачу</p>
              <img
                className="kanban__button-img"
                src={plus}
                alt="Добавить новую задачу"
              />
            </button>
          </div>
        </nav>
        <Boards boardsList={boardsListEmpty} />
        {isNoProject ? <NotProject /> : isNoTask === true && <NotFoundTask />}
      </div>
      {isOpenPopup && (
        <PopupKanban
          setIsOpenPopup={setIsOpenPopup}
          projects={projects}
          setProjects={setProjects}
        />
      )}
    </section>
  ) : (
    ''
  );
}

export default Kanban;
