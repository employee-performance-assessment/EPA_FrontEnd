import { useSelector } from 'react-redux';
import { useState } from 'react';
import Board from '../Board/Board.jsx';
import SideMenu from '../SideMenu/SideMenu.jsx';
import './Boards.scss';
import './Boards.css';
import UsersThree from '../../images/UsersThree.svg';
import PlusIcon from '../../images/Plus.svg';
import { boardsList } from '../../constants/boardsList.js';

function Boards() {
  const clearCards = () => {};
  const isLoggedIn = useSelector((state) => state.isLoggedIn.isLoggedIn);
  const [cardsLists, setCardsLists] = useState(boardsList);
  const [dropCard, setDropCard] = useState(null);
  const [startBoard, setStartBoard] = useState(null);
  const [currentBoard, setCurrentBoard] = useState(null);
  return isLoggedIn ? (
    <section className="boards_page">
      <div className="boards__wrapper">
        <div className="boards__sidemenu">
          <SideMenu />
        </div>
        <div className="boards__main">
          <nav className="boards__nav">
            <div className="boards__icon-block">
              <img
                src={UsersThree}
                alt="Иконка команды"
                className="boards__icon"
              />
              <p className="boards__label">Моя команда</p>
            </div>
            <button type="button" className="boards__button">
              Добавить сотрудника
              <img
                src={PlusIcon}
                alt="Иконка добавления сотрудника"
                className="boards__button-icon"
              />
            </button>
          </nav>
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
        </div>
      </div>
    </section>
  ) : (
    ''
  );
}

export default Boards;
