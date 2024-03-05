import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.jsx';
import NotFound from '../NotFound/NotFound.jsx';
import MainPage from '../MainPage/MainPage.jsx';
import Auth from '../Auth/Auth.jsx';
import Boards from '../Boards/Boards.jsx';
import Header from '../Header/Header.jsx';
import { endpoint } from '../../constants/constantsEndpointRoute.js';

function App() {
  // в cardsList записываем ответ на запрос get от API, задания со всеми параметрами
  const [cardsLists, setCardsLists] = useState([
    {
      id: 1,
      title: 'Сделать',
      items: [
        { title: 'задание 1 доска 1', id: 111, order: 1 },
        { title: 'задание 2 доска 1', id: 212, order: 2 },
        { title: 'задание 3 доска 1', id: 313, order: 3 },
        { title: 'задание 4 доска 1', id: 414, order: 4 },
      ],
    },
    {
      id: 2,
      title: 'В работе',
      items: [
        { title: 'задание 1 доска 2', id: 121, order: 1 },
        { title: 'задание 2 доска 2', id: 222, order: 2 },
        { title: 'задание 3 доска 2', id: 323, order: 3 },
        { title: 'задание 4 доска 2', id: 424, order: 4 },
      ],
    },
    {
      id: 3,
      title: 'Готово',
      items: [
        { title: 'задание 1 доска 3', id: 131, order: 1 },
        { title: 'задание 2 доска 3', id: 232, order: 2 },
        { title: 'задание 3 доска 3', id: 333, order: 3 },
        { title: 'задание 4 доска 3', id: 434, order: 3 },
      ],
    },
  ]);

  const [dropCard, setDropCard] = useState(null);
  const [startBoard, setStartBoard] = useState(null);
  const [currentBoard, setCurrentBoard] = useState(null);
  const loggedIn = true;
  // const [loggedIn, setLoggedIn] = useState(false);
  const { main, board, anyPage } = endpoint;

  const [isFormAuthBlock, setIsFormAuthBlock] = useState(false);

  const clearCards = () => {};

  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <Routes>
          {/* проверяем, если залогинин, прогоняем через ProtectedRoute */}
          {/* ,если нет, то открывается страница авторизации */}
          {/* true заменить на loggedIn */}
          <Route
            path={main}
            element={
              true ? (
                <ProtectedRoute
                  element={MainPage}
                  isLoggedIn
                  isLoading={false}
                />
              ) : (
                <Auth
                  isLoggedIn={loggedIn}
                  isFormAuthBlock={isFormAuthBlock}
                  setIsFormAuthBlock={setIsFormAuthBlock}
                />
              )
            }
          />
          {/* канбан доска */}
          <Route
            path={board}
            element={
              <ProtectedRoute
                element={Boards}
                isLoggedIn
                currentBoard={currentBoard}
                setCurrentBoard={setCurrentBoard}
                dropCard={dropCard}
                setDropCard={setDropCard}
                startBoard={startBoard}
                setStartBoard={setStartBoard}
                clearCards={clearCards}
                cardsLists={cardsLists}
                setCardsLists={setCardsLists}
              />
            }
          />
          {/* страница без роута */}
          <Route path={anyPage} element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
