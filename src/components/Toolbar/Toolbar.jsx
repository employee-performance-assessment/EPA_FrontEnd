import React from 'react';
import './Toolbar.css';

<<<<<<< HEAD
function Toolbar({ addCard, clearCards }) {
=======
const Toolbar = ({ addCard, clearCards }) => {
>>>>>>> 6e720b665f0eb5abdcfb4386ee404cf291466178
  const onClickAdd = () => {
    addCard();
  };

  const onClickClear = () => {
    clearCards();
  };

  return (
    <div className="toolbar">
      <div className="toolbar__left">
        <button className="toolbar__button" onClick={onClickAdd}>
          Добавить задание
        </button>
        <button to="/team3" className="toolbar__button" onClick={onClickClear}>
<<<<<<< HEAD
          Очистить все задания
=======
         Очистить все задания
>>>>>>> 6e720b665f0eb5abdcfb4386ee404cf291466178
        </button>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
};
>>>>>>> 6e720b665f0eb5abdcfb4386ee404cf291466178

export default Toolbar;
