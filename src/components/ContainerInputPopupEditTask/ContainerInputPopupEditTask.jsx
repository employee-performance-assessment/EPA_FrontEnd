import './ContainerInputPopupEditTask.scss';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import './DatePicker.scss';

export default function ContainerInputPopupEditTask({ item }) {
  function handleClickClose() {
    console.log('edit input');
  }

  function setBigInput() {
    console.log(item.type);
    return item.type === 'container-input-popup-edit-task__button_big'
      ? 'container-input-popup-edit-task__input-conteiner_big'
      : '';
  }

  const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  const months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];

  const locale = {
    localize: {
      day: (n) => days[n],
      month: (n) => months[n],
    },
    formatLong: {
      date: () => 'dd/mm/yyyy',
    },
  };

  // CSS Modules, react-datepicker-cssmodules.css
  // import 'react-datepicker/dist/react-datepicker-cssmodules.css';
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div
      className={`container-input-popup-edit-task__input-conteiner ${setBigInput()}`}
    >
      {item.type !== 'container-input-popup-edit-task__button_big' ? (
        item.type === 'container-input-popup-edit-task__button_calendar' ? (
          <DatePicker
            first
            dateFormat="dd/MM/yyyy"
            selected={startDate}
            locale={locale}
            onChange={(date) => setStartDate(date)}
            required
            form="external-form"
          />
        ) : (
          <input
            type="text"
            className="container-input-popup-edit-task__input "
            placeholder={item.nameInput}
          ></input>
        )
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
          ></textarea>
        </>
      )}
      {item.type !== 'container-input-popup-edit-task__button_empty' && (
        <button
          className={`container-input-popup-edit-task__button ${item.type}`}
          aria-label={`редактировать поле ${item.nameInput}`}
          onClick={handleClickClose}
        ></button>
      )}
    </div>
  );
}
