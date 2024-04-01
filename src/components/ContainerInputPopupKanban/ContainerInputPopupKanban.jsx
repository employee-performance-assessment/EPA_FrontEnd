import './ContainerInputPopupKanban.scss';

export default function ContainerInputPopupKanban({ item }) {
  return (
    <div className="container-input-popup-kanban__input-conteiner">
      <input
        type="text"
        className="container-input-popup-kanban__input"
        placeholder={item.nameProject}
      />
      <button
        className="container-input-popup-kanban__button container-input-popup-kanban__button_edit"
        aria-label="кнопка редактирования проекта"
      />
      <button
        className="container-input-popup-kanban__button container-input-popup-kanban__button_delete"
        aria-label="кнопка удаления проекта"
      />
    </div>
  );
}
