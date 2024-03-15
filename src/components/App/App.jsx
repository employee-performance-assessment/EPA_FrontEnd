import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.jsx';
import NotFound from '../NotFound/NotFound.jsx';
import MainPage from '../MainPage/MainPage.jsx';
import Boards from '../Boards/Boards.jsx';
import { endpoint } from '../../constants/constantsEndpointRoute.js';
import Auth from '../Auth/Auth.jsx';
import Register from '../Register/Register.jsx';
import { boardsList } from '../../constants/boardsList.js';

function App() {
  // в cardsList записываем ответ на запрос get от API, задания со всеми параметрами
  const [cardsLists, setCardsLists] = useState(boardsList);

  const [dropCard, setDropCard] = useState(null);
  const [startBoard, setStartBoard] = useState(null);
  const [currentBoard, setCurrentBoard] = useState(null);
  const loggedIn = true;
  // const [loggedIn, setLoggedIn] = useState(false);
  const { main, board, anyPage } = endpoint;

  const [isFormAuthBlock, setIsFormAuthBlock] = useState(false);

  const clearCards = () => { };

  return (
    <div className="page">
      {/* <div className="page__content"> */}
      <Routes>
        {/* проверяем, если залогинин, прогоняем через ProtectedRoute */}
        {/* ,если нет, то открывается страница авторизации */}
        {/* true заменить на loggedIn */}
        <Route
          path={main}
          element={
            !true ? (
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
        <Route path="/signup" element={<Register isLoggedIn={loggedIn} />} />
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
      {/* </div> */}
    </div>
  );
}

export default App;
