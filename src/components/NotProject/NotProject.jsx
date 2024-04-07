import { useState } from 'react';
import './NotProject.scss';
import empty from '../../images/about-our-team.svg';
import trashSimple from '../../images/TrashSimple.svg';
import { setNewProjects, getProjectsName } from '../../utils/mainApi.js';

export function NotProject({ setProjects }) {
  const [nameProject, setProjectName] = useState('');

  function handleClickNewProject() {
    setNewProjects(nameProject)
      .then(() => {
        getProjectsName()
          .then((res) => {
            setProjects(res);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  function handleNameProject(e) {
    setProjectName(e.target.value);
  }

  return (
    <div className="not-project">
      <h1 className="not-project__title">
        У вас ещё нет проектов. Создайте свой первый проект.
      </h1>
      <img className="not-project__img" src={empty} alt="отсутствуют задания" />
      <div className="not-project__input-conteiner">
        <input
          type="text"
          className="not-project__input"
          placeholder="Название проекта"
          onChange={handleNameProject}
        />
        <button
          className="not-project__button not-project__button_edit"
          aria-label="кнопка редактирования проекта"
          onClick={handleClickNewProject}
        />
        <img
          className="not-project__button"
          src={trashSimple}
          alt="очистить поле"
        />
      </div>
      <button className="not-project__button not-project__button_purple">
        Подтвердить
      </button>
    </div>
  );
}
