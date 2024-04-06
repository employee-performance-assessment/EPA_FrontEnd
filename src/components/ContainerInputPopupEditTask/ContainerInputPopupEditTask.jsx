import './ContainerInputPopupEditTask.scss';

export default function ContainerInputPopupEditTask({ item }) {
  function handleClickClose() {
    // console.log('edit input');
  }

  function setBigInput() {
    return item.type === 'container-input-popup-edit-task__button_big'
      ? 'container-input-popup-edit-task__input-conteiner_big'
      : '';
  }

  return (
    <div
      className={`container-input-popup-edit-task__input-conteiner ${setBigInput()}`}
    >
      {item.type !== 'container-input-popup-edit-task__button_big' ? (
        <input
          type="text"
          className="container-input-popup-edit-task__input "
          placeholder={item.nameInput}
        />
      ) : (
        <>
          <span className="container-input-popup-edit-task__span">
            Баллы, которые нужно списать за каждый день нарушения дедлайна или
            начислить за сдачу раньше срока
          </span>
          <textarea
            type="text"
            className="container-input-popup-edit-task__input_textarea"
            placeholder={item.nameInput}
          />
        </>
      )}

      {item.type !== 'container-input-popup-edit-task__button_empty' && (
        <button
          className={`container-input-popup-edit-task__button ${item.type}`}
          aria-label={`редактировать поле ${item.nameInput}`}
          onClick={handleClickClose}
        />
      )}
    </div>
  );
}
