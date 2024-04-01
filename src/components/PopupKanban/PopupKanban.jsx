import './PopupKanban.scss';
import ContainerInputPopupKanban from '../ContainerInputPopupKanban/ContainerInputPopupKanban.jsx';

export function PopupKanban({ setIsOpenPopup }) {
  const arrProject = [
    { nameProject: 'gsdfgsdg' },
    { nameProject: 'пвпапвыпв' },
  ];

  function handleClickClose() {
    setIsOpenPopup(false);
  }

  return (
    <div className="popup-kanban">
      <div className="popup-kanban__popup">
        <h1 className="popup-kanban__title">Редактировать</h1>
        {arrProject.map((item) => (
          <ContainerInputPopupKanban item={item} key={item.nameProject} />
        ))}
        <button className="popup-kanban__button ">
          Добавить новый проект +
        </button>
        <button
          className="popup-kanban__button popup-kanban__button_purple"
          aria-label="Подтвердить"
        >
          Подтвердить
        </button>
        <button
          className="popup-kanban__button popup-kanban__button_close"
          aria-label="закрыть модальное окно"
          onClick={handleClickClose}
         />
      </div>
    </div>
  );
}
