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
  );
}

export default Boards;
