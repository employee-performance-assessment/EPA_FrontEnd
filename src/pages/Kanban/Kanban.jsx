import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Boards from '../../components/Boards/Boards.jsx';
import { NotFoundTask } from '../../components/NotFoundTask/NotFoundTask.jsx';
import { NotProject } from '../../components/NotProject/NotProject.jsx';
import PopupKanban from '../../components/PopupKanban/PopupKanban.jsx';
import PopupAddNewTask from '../../components/PopupAddNewTask/PopupAddNewTask.jsx';
import PopupProject from '../../components/PopupProject/PopupProject.jsx';
import plus from '../../images/Plus.svg';
import edit from '../../images/edit-button-icon.svg';
import caretDown from '../../images/CaretDown_black.svg';
import {
  getProjectsName,
  getInfoOwnerJWT,
  getAdminTask,
  getUserTask,
  updateTaskStatusByUser,
  getStatPointsByUser,
} from '../../utils/mainApi.js';
import './Kanban.scss';
import InfoPopup from '../../components/InfoPopup/InfoPopup.jsx';
import { useErrorHandler } from '../../hooks/useErrorHandler.js';
import { formPointsText } from '../../utils/utils.js';

function Kanban() {
  const user = useSelector((state) => state.user);
  const [isNoProject, setIsNoProject] = useState(true);
  const [isNoTask, setIsNoTask] = useState(true);
  const [isOpenPopupKanban, setIsOpenPopupKanban] = useState(false);
  const [projects, setProjects] = useState([]);
  const [isOpenPopupAddTask, setIsOpenPopupAddTask] = useState(false);
  const [isOpenPopupProject, setIsOpenPopupProject] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [currentTasks, setCurrentTasks] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const [currenProject, setCurrentProject] = useState('all');
  const [points, setPoints] = useState(0);
  const { popupText, isPopupOpen, handleError, closePopup } =
    useErrorHandler();

  useEffect(() => {
    if (projects.length > 0) {
      setIsNoProject(false);
    } else {
      setIsNoProject(true);
    }
  }, [projects]);

  useEffect(() => {
    if (tasks.length > 0) {
      setIsNoTask(false);
      setCurrentTasks(
        currenProject === 'all'
          ? tasks
          : tasks.filter((item) => item.project.name === currenProject)
      );
    } else {
      setIsNoTask(true);
    }
  }, [tasks]);

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      Promise.all([
        getProjectsName(),
        getInfoOwnerJWT(),
        user.isAdmin ? getAdminTask() : getUserTask(),
  
      ])
        .then((res) => {
          setProjects(res[0]);
          setTasks(res[2]);
          if (res[2].length > 0) {
            setIsNoTask(false);
          }
          setPoints(res[3]);
        })
        .catch((err) => handleError(err))
        .finally(() => setIsLoad(false));
    }
  }, [user]);

  function getNewTasks(taskId, statusTask) {
    updateTaskStatusByUser(taskId, statusTask)
      .then(() => {
        (user.isAdmin ? getAdminTask() : getUserTask())
          .then((res) => setTasks(res))
          .catch((err) => handleError(err));
      })
      .catch((err) => handleError(err));
  }

  function handleClickOpenPopup() {
    setIsOpenPopupKanban(true);
  }

  function handleClickViewAllTask() {
    user.isAdmin
      ? getAdminTask()
        .then((res) => {
          setTasks(res);
          setCurrentProject('all');
        })
        .catch((err) => handleError(err))
      : getUserTask()
        .then((res) => {
          setTasks(res);
          setCurrentProject('all');
        })
        .catch((err) => handleError(err));
  }

  function moveElementByNameToStart(array, name) {
    const index = array.findIndex((item) => item.name === name);
    if (index !== -1) {
      // Перемещаем элемент в начало массива
      array.splice(0, 0, array.splice(index, 1)[0]);
    }
  }

  function handleClickProject(project) {
    setCurrentProject(project.name);
    setCurrentTasks(tasks.filter((item) => item.project.id === project.id));
    const arrProject = projects.map((i) => i);
    moveElementByNameToStart(arrProject, project.name);
    setProjects(arrProject);
  }

  return user ? (
    isLoad ? (
      <div className="kanban__main" />
    ) : (
      <section className="kanban_page">
        <div className="kanban__main">
          <nav className="kanban__nav">
            <div className="kanban__container-project">
              <p className="kanban__label">Проект:</p>
              {projects[0] && (
                <button
                  type="button"
                  className={`kanban__button ${currenProject === projects[0].name ? 'kanban__button_border' : 'kanban__button_non-border'}`}
                  onClick={() => handleClickProject(projects[0])}
                >
                  <p className="kanban__button-title">{projects[0].name} </p>
                </button>
              )}
              {projects[1] && (
                <button
                  type="button"
                  className={`kanban__button ${currenProject === projects[1].name ? 'kanban__button_border' : 'kanban__button_non-border'}`}
                  onClick={() => handleClickProject(projects[1])}
                >
                  <p className="kanban__button-title">{projects[1].name} </p>
                </button>
              )}
              <button
                type="button"
                className="kanban__button kanban__button_more"
                onClick={() => {
                  setIsOpenPopupProject(true);
                }}
                disabled={projects.length < 3}
              >
                <p className="kanban__button-title">
                  ...ещё {projects.length > 2 && projects.length - 2}
                </p>
                <img src={caretDown} alt="Раскрыть список проектов" />
              </button>
              <button
                type="button"
                className={`kanban__button ${projects.length < 1 ? 'kanban__button_grey' : currenProject === 'all' ? 'kanban__button_purple' : 'kanban__button_grey'} kanban__button_all`}
                onClick={handleClickViewAllTask}
                disabled={projects.length < 1}
              >
                <p className="kanban__button-title_all">Все</p>
              </button>
              {isOpenPopupProject && (
                <PopupProject
                  projects={projects}
                  setIsOpenPopupProject={setIsOpenPopupProject}
                  handleClickProject={handleClickProject}
                />
              )}
            </div>
            <div className="kanban__container-project">
              {!isLoad && user.isAdmin ? (
                <>
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
                    onClick={() => setIsOpenPopupAddTask(true)}
                  >
                    <p className="kanban__button-title_make">Создать задачу</p>
                    <img
                      className="kanban__button-img"
                      src={plus}
                      alt="Добавить новую задачу"
                    />
                  </button>
                </>
              ) : (
                <div className="kanban-header__point">{points || '10000000'} {formPointsText(points)}</div>
              )}
            </div>
          </nav>
          {!isLoad && <Boards tasks={currentTasks} getNewTasks={getNewTasks} />}
          {isNoProject ? (
            <NotProject setProjects={setProjects} />
          ) : (
            isNoTask === true && <NotFoundTask />
          )}
        </div>
        {isOpenPopupKanban && (
          <PopupKanban
            setIsOpenPopup={setIsOpenPopupKanban}
            projects={projects}
            setProjects={setProjects}
          />
        )}
        {isOpenPopupAddTask && (
          <PopupAddNewTask
            setIsOpenPopup={setIsOpenPopupAddTask}
            title="Создать здачу"
            projects={projects}
            setTasks={setTasks}

          />
        )}
        {isPopupOpen && (
          <InfoPopup
            text={popupText}
            handleClosePopup={closePopup}
          />
        )}
      </section>
    )
  ) : (
    ''
  );
}

export default Kanban;
