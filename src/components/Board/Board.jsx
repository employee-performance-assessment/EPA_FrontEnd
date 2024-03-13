import React from 'react';
import './Board.css';
import TimerDeadline from '../TimerDeadline/TimerDeadline.jsx';

function Board({
  currentBoard,
  setCurrentBoard,
  setCardsLists,
  cardsLists,
  board,
  /* idBoard,  */
  dropCard,
  setDropCard,
  startBoard,
  setStartBoard,
  title,
}) {
  // События, возникающие в перемещаемом объекте (исходный элемент):
  // ondragstart – возникает, когда пользователь начинает перемещать элемент
  // ondrag – возникает во время перемещения элемента
  // ondragend - возникает, когда пользователь заканчивает перемещать элемент

  // События, возникающие в объекте-приемнике:
  // ondragenter - возникает, когда перемещаемый элемент входит в принимающий объект
  // ondragover - возникает, когда перемещаемый элемент проходит над принимающим объектом
  // ondragleave - возникает, когда перемещаемый элемент покидает принимающий объект
  // ondrop - возникает, когда пользователь отпускает перемещаемый элемент
  function dragEndHandler(e) {
    e.currentTarget.classList.remove('boardDnD__card_OverHandler');
    e.target.classList.remove('boardDnD__card_OverHandler');
  }

  function dragOverHandler(e, board) {
    e.preventDefault();
    setCurrentBoard(board);
    e.currentTarget.classList.add('boardDnD__card_OverHandler');
  }

  function dragStartHandler(e, board, card) {
    setDropCard(card);
    setStartBoard(board);
  }

  function rebuildArr(arr, card) {
    return arr.map((c) => {
      if (c.id === card.id) {
        return { ...c, order: dropCard.order };
      }
      if (c.id === dropCard.id) {
        return { ...c, order: card.order };
      }
      return c;
    });
  }

  function dropHandler(e, board, card) {
    e.preventDefault();
    const updateBoard = cardsLists.map((i) => i);
    if (currentBoard.id === startBoard.id) {
      const newArrCards = rebuildArr(cardsLists[board.id - 1].items, card);
      startBoard.items = newArrCards;
      setCardsLists(updateBoard);
    } else {
      const currentIndex = startBoard.items.indexOf(dropCard);
      startBoard.items.splice(currentIndex, 1);
      const dropIndex = board.items.indexOf(card);
      currentBoard.items.splice(dropIndex + 1, 0, dropCard);
      const boards = cardsLists.map((i) => i);
      boards[startBoard.id - 1] = startBoard;
      boards[currentBoard.id - 1] = currentBoard;
      setCardsLists(boards);
    }
    e.currentTarget.classList.remove('boardDnD__card_OverHandler');
  }

  // функция сортировки применяемая для упорядочивания карт для отрисовки после перетпскивания
  const sortCard = (a, b) => {
    if (a.order > b.order) {
      return 1;
    }
    return -1;
  };

  // функция установки цвета поля баллов
  function getCollor(bord, deadline) {
    // console.log(deadline - new Date().getTime());
    if (deadline - new Date().getTime() <= 0) {
      return 'boardDnD__card-points_red';
    } else if (bord === 'К выполнению') {
      return 'boardDnD__card-points_grey';
    } else if (bord === 'В работе') {
      return 'boardDnD__card-points_light-green';
    } else if (bord === 'На ревью') {
      return 'boardDnD__card-points_violet';
    } else if (bord === 'Выполнено') {
      return 'boardDnD__card-points_green';
    } else {
      return '';
    }
  }

  function settingDateDeadline(unixData) {
    const date = new Date(unixData); // Преобразуем Unix-время в миллисекунды
    return date.toLocaleDateString(); // Форматируем дату
  }

  return (
    <div className="boardDnD">
      <h1 className="boardDnD__title">{title}</h1>
      {board.items.sort(sortCard).map((card) => (
        <div
          className={'boardDnD__card'} // сначала сортируем карты по порядку (order), затем перебираем массив для отрисовки карточек
          draggable={true}
          onDragEnd={(e) => dragEndHandler(e)}
          onDragLeave={(e) => dragEndHandler(e)}
          onDragOver={(e) => dragOverHandler(e, board)}
          onDragStart={(e) => dragStartHandler(e, board, card)}
          onDrop={(e) => dropHandler(e, board, card)}
          key={card.id}
        >
          <p className="boardDnD__card-number">{card.id}</p>
          <p
            className={`boardDnD__card-points ${getCollor(title, card.deadline)}`}
          >
            {card.points} баллов
          </p>
          <h3 className="boardDnD__card-title">{card.title}</h3>
          <p className="boardDnD__card-deadline">
            Дедлайн: {settingDateDeadline(card.deadline)}
          </p>
          <p className="boardDnD__card-forfeit">
            {card.forfeit} за просрочку дедлайна
          </p>
          <div className="boardDnD__card-deadline-timer">
            <TimerDeadline deadline={card.deadline} />
          </div>
        </div>
      ))}
    </div>
  );

  // на потом!!!
  //   return (
  //     <div className="boardDnD">
  //       <div className="boardDnD__column boardDnD__column_left">
  //         <Toolbar addCard={addCard} clearCards={clearCards} />
  //       </div>
  //       <div className="boardDnD__column boardDnD__column_center">
  //         <Cards cards={[
  //           { title: 'первое dasdsadfsafsdafsdafdsaf задание', id: 111 },
  //           { title: 'второе задание', id: 222 },
  //         ]} title='Выполнить' />
  //       </div>
  //       <div className="boardDnD__column">
  //         <Cards cards={[
  //           { title: 'первое ujnjdjt задание', id: 111 },
  //           { title: 'второе зfghfhfhgf gfdgdgdg адание', id: 222 },
  //         ]} title='Готово' />
  //       </div>
  //     </div>
  //   );
}

export default Board;
