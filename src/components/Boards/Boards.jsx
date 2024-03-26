import Board from '../Board/Board.jsx';
import './Boards.css';
import { useSelector } from 'react-redux';
import SideMenu from '../../components/SideMenu/SideMenu.jsx';
import './Boards.scss';
import UsersThree from '../../images/UsersThree.svg';
import PlusIcon from '../../images/Plus.svg';

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
  const isLoggedIn = useSelector((state) => state.isLoggedIn.isLoggedIn);

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
            <button
              type="button"
              className="boards__button"
            >
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
  ) : ('');
}

export default Boards;
