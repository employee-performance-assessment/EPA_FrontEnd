import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.jsx';
import NotFound from '../NotFound/NotFound.jsx';
import MainPage from '../MainPage/MainPage.jsx';
import Auth from '../Auth/Auth.jsx';
import Boards from '../Boards/Boards.jsx';
import Header from '../Header/Header.jsx';
import { endpoint } from '../../constants/constantsEndpointRoute.js';
import { boardsList } from '../../constants/boardsList.js';
import { register /* , authorize */ } from '../../utils/resistr.js';

function App() {
  const dataReg = {
    email: 'ppp@ppppp.ru',
    fullName: 'pppp',
    password: 'pppppppp',
  };
  register(dataReg)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  // в cardsList записываем ответ на запрос get от API, задания со всеми параметрами
  const [cardsLists, setCardsLists] = useState(boardsList);

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
                  isLoggedIn={true}
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
                isLoggedIn={true}
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
