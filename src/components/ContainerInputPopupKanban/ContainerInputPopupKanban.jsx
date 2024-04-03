import { useState } from 'react';
import './ContainerInputPopupKanban.scss';
import { setProjectsNewName, deleteProject } from '../../utils/mainApi.js';

export default function ContainerInputPopupKanban({ item }) {
  const [nameProject, setProjectName] = useState(item.name);
  console.log(item);
  function handleButtonEditProject() {
    setProjectsNewName(nameProject, item.id);
  }

  function handleButtonDeleteProject() {
    deleteProject(item.id)
      .then((res) => {
        console.log(res);
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
