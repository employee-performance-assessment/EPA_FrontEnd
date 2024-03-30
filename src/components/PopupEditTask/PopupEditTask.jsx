import './PopupEditTask.scss';
import ContainerInputPopupEditTask from '../ContainerInputPopupEditTask/ContainerInputPopupEditTask.jsx';

export function PopupEditTask({ setIsOpenPopup }) {
  const arrInput = [
    {
      nameInput: 'Название задачи',
      type: 'container-input-popup-edit-task__button_empty',
    },
    {
      nameInput: 'Проект к которому относится задача',
      type: 'container-input-popup-edit-task__button_arrow-down',
    },
    {
      nameInput: 'Дедлайн',
      type: 'container-input-popup-edit-task__button_calendar',
    },
    {
      nameInput: 'Исполнитель',
      type: 'container-input-popup-edit-task__button_arrow-down',
    },
    {
      nameInput: 'Баллы за задачу',
      type: 'container-input-popup-edit-task__button_empty',
    },
    {
      nameInput: 'Бонусные и штрафные баллы',
      type: 'container-input-popup-edit-task__button_empty',
    },
    {
      nameInput: 'Описание задачи',
      type: 'container-input-popup-edit-task__button_big',
    },
  ];

  function handleClickClose() {
    setIsOpenPopup(false);
  }

  return (
    <div className="popup-edit-task">
      <div className="popup-edit-task__popup">
        <h1 className="popup-edit-task__title">Редактировать</h1>
        <div className="popup-edit-task__container-input">
          {arrInput.map((item) => (
            <ContainerInputPopupEditTask item={item} key={item.nameInput} />
          ))}
        </div>
        <button
          className="popup-edit-task__button popup-edit-task__button_purple"
          aria-label="Подтвердить"
        >
          Подтвердить
        </button>
        <button
          className="popup-edit-task__button popup-edit-task__button_close"
          aria-label="закрыть модальное окно"
          onClick={handleClickClose}
        ></button>
      </div>
    </div>
  );
}
