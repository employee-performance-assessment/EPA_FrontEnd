import React from 'react';
import Board from '../Board/Board.jsx';
import './Boards.css';

function Boards({
  currentBoard,
  setCurrentBoard,
  clearCards,
  cardsLists,
  setCardsLists,
  dropCard,
  setDropCard,
  startBoard,
  setStartBoard,
}) {
  return (
<<<<<<< HEAD
    <div className="boards">
      {cardsLists.map((board, i) => (
        <Board
          cardsLists={cardsLists}
          key={board.id}
          title={board.title}
          clearCards={clearCards}
          board={board}
          idBoard={i}
          setCardsLists={setCardsLists}
          dropCard={dropCard}
          setDropCard={setDropCard}
          startBoard={startBoard}
          setStartBoard={setStartBoard}
          currentBoard={currentBoard}
          setCurrentBoard={setCurrentBoard}
        />
      ))}
    </div>
=======
    <div className='boards'>{cardsLists.map((board, i) => <Board cardsLists={cardsLists} key={board.id} title={board.title} clearCards={clearCards} board={board} idBoard={i} setCardsLists={setCardsLists} dropCard={dropCard} setDropCard={setDropCard} startBoard={startBoard} setStartBoard={setStartBoard} currentBoard={currentBoard} setCurrentBoard={setCurrentBoard} />)}</div>
>>>>>>> 6e720b665f0eb5abdcfb4386ee404cf291466178
  );
}

export default Boards;
