import './Toolbar.css';

function Toolbar({ addCard, clearCards }) {
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
          Очистить все задания
        </button>
      </div>
    </div>
  );
}

export default Toolbar;
