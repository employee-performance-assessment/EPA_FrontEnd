import { useState } from 'react';
import Board from '../Board/Board.jsx';
import './Boards.scss';

function Boards({ boardsList }) {
  const [cardsLists, setCardsLists] = useState(boardsList);
  const [dropCard, setDropCard] = useState(null);
  const [startBoard, setStartBoard] = useState(null);
  const [currentBoard, setCurrentBoard] = useState(null);

  return (
    <div className="boards">
      {cardsLists.map((board) => (
        <Board
          cardsLists={cardsLists}
          key={board.id}
          board={board}
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
