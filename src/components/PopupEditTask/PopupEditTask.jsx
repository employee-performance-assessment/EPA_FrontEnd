import './PopupEditTask.scss';
import ContainerInputPopupEditTask from '../ContainerInputPopupEditTask/ContainerInputPopupEditTask.jsx';
import PeriodDatePicker from '../PeriodDatePicker/PeriodDatePicker.jsx';

function PopupEditTask({ setIsOpenPopup, title }) {
  const arrInput = [
    {
      nameInput: 'Название задачи',
      className: 'container-input-popup-edit-task__button_empty',
    },
    {
      nameInput: 'Проект к которому относится задача',
      className: 'container-input-popup-edit-task__button_arrow-down',
    },
    {
      nameInput: 'Дедлайн',
      className: 'container-input-popup-edit-task__button_calendar',
    },
    {
      nameInput: 'Исполнитель',
      className: 'container-input-popup-edit-task__button_arrow-down',
    },
    {
      nameInput: 'Баллы за задачу',
      className: 'container-input-popup-edit-task__button_empty',
    },
    {
      nameInput: 'Бонусные и штрафные баллы',
      className: 'container-input-popup-edit-task__button_empty',
    },
    {
      nameInput: 'Описание задачи',
      className: 'container-input-popup-edit-task__button_big',
    },
  ];

  function handleClickClose() {
    setIsOpenPopup(false);
  }

  return (
    <div className="popup-edit-task">
      <div className="popup-edit-task__popup">
        <h1 className="popup-edit-task__title">{title}</h1>
        <div className="popup-edit-task__container-input">
          {arrInput.map((item) =>
            item.type === 'container-input-popup-edit-task__button_calendar' ? (
              <PeriodDatePicker />
            ) : (
              <ContainerInputPopupEditTask item={item} key={item.nameInput} />
            )
          )}
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
        />
      </div>
    </div>
  );
}

export default PopupEditTask;
