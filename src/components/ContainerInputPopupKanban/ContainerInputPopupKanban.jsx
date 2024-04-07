import { useState } from 'react';
import './ContainerInputPopupKanban.scss';
import {
  setProjectsNewName,
  deleteProject,
  getProjectsName,
} from '../../utils/mainApi.js';

export default function ContainerInputPopupKanban({ item, setProjects }) {
  const [nameProject, setProjectName] = useState(item.name);

  function handleButtonEditProject() {
    setProjectsNewName(nameProject, item.id)
      .then(() => {
        getProjectsName()
          .then((res) => {
            setProjects(res);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  function handleButtonDeleteProject() {
    deleteProject(item.id)
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
    <div className="container-input-popup-kanban__input-conteiner">
      <input
        type="text"
        className="container-input-popup-kanban__input"
        placeholder={item.name}
        onChange={handleNameProject}
        value={nameProject}
      />
      <button
        className="container-input-popup-kanban__button container-input-popup-kanban__button_edit"
        aria-label="кнопка редактирования проекта"
        onClick={handleButtonEditProject}
      />
      <button
        className="container-input-popup-kanban__button container-input-popup-kanban__button_delete"
        aria-label="кнопка удаления проекта"
        onClick={handleButtonDeleteProject}
      />
    </div>
  );
}
