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
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [projectsName, setProjectsName] = useState([])


  // не забыть проверить положение когда с бэка придет пустой объект с
  // проектами, не должно ничего отрисовываться.
  const nameProject = 'Linkpass';
  const nameNotActivProject = 'ByteBoost';

  const numberProjects = '3';

  // useEffect(() => {
  //   getProjectsName().then((res) => {
  //     setProjectName(res)
  //   }).catch((err) => console.log(err))
  // }, [])

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
          <div className='kanban__container-project'>
            <p className="kanban__label">Проект:</p>
            {projectsName[0] && <button
              type="button"
              className="kanban__button kanban__button_border"
            >
              {projectsName[0].name}
            </button>}
            {projectsName[1] && <button
              type="button"
              className="kanban__button kanban__button_non-border"
            >
              {projectsName[1].name}
            </button>}</div>
          <div className='kanban__container-project'>
            <button
              type="button"
              className="kanban__button kanban__button_more"
            > <p className="kanban__button-title"> ...ещё {projectsName.length > 2 && projectsName.length - 2}</p><img src={caretDown} alt="Раскрыть список проектов" />
            </button>
            <button
              type="button"
              className={`kanban__button ${projectsName.length < 1 ? 'kanban__button_grey' : 'kanban__button_purple'} kanban__button_all`}
              onClick={handleClickOpenPopup}
              disabled={projectsName.length < 1}
            >
              <p className="kanban__button-title_all">Все</p>
            </button>
            <button
              type="button"
              className="kanban__button kanban__button_project"
              onClick={handleClickViewAllTask}
            >
              <p className="kanban__button-title_make">Проекты</p>  <img src={edit} alt="Редактировать проект" />
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
          </div>
        </nav>
        <Boards boardsList={boardsListEmpty} />
        {isEmpty !== 1 ? <NotFoundTask /> : <NotProject />}
      </div>
      {isOpenPopup && <PopupKanban setIsOpenPopup={setIsOpenPopup} projectsName={projectsName} />}
    </section>
  ) : (
    ''
  );
}

export default Kanban;
