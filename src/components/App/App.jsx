import { useState, useEffect } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.jsx';

import Auth from '../../pages/Auth/Auth.jsx';
import Register from '../../pages/Register/Register.jsx';
import PersonalArea from '../../pages/PersonalArea/PersonalArea.jsx';
import MyTeam from '../../pages/MyTeam/MyTeam.jsx';
import Boards from '../Boards/Boards.jsx';
import AnalyticsPage from '../../pages/AnalyticsPage/AnalyticsPage.jsx';
import NotFound from '../NotFound/NotFound.jsx';

import { ENDPOINT_ROUTES } from '../../constants/constantsEndpointRoute.js';
import { boardsList } from '../../constants/boardsList.js';

import { getUserData } from '../../utils/mainApi.js';
import { setAdminData } from '../../store/slices/adminDataSlices.js';
import { setIsLoggedIn } from '../../store/slices/isLoggedInSlice.js';

function App() {
  // в cardsList записываем ответ на запрос get от API, задания со всеми параметрами
  const [cardsLists, setCardsLists] = useState(boardsList);
  const [dropCard, setDropCard] = useState(null);
  const [startBoard, setStartBoard] = useState(null);
  const [currentBoard, setCurrentBoard] = useState(null);
  const {
    login,
    register,
    personalArea,
    myTeam,
    board,
    anyPage,
    analytics,
  } = ENDPOINT_ROUTES;
  const [isFormAuthBlock, setIsFormAuthBlock] = useState(false);
  const isLoggedIn = useSelector((state) => state.isLoggedIn.isLoggedIn);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const clearCards = () => {};

  const tokenCheck = () => {
    if (localStorage.getItem('token')) {
      const { token } = JSON.parse(localStorage.getItem('token'));
      if (token) {
        getUserData(token)
          .then((res) => {
            if (res) {
              navigate(location.pathname);
              dispatch(setAdminData(res));
              dispatch(setIsLoggedIn(true));
            }
          })
          // eslint-disable-next-line no-alert
          .catch((err) => alert(`Ошибка: ${err}`));
      }
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<Navigate to={login} />} />
        <Route path={register} element={<Register />} />
        <Route
          path={login}
          element={
            <Auth
              isFormAuthBlock={isFormAuthBlock}
              setIsFormAuthBlock={setIsFormAuthBlock}
            />
          }
        />
        <Route
          path={personalArea}
          element={
            <ProtectedRoute
              element={PersonalArea}
              isLoggedIn={isLoggedIn}
              isLoading={false}
            />
          }
        />
        {/* канбан доска */}
        <Route
          path={board}
          element={
            <ProtectedRoute
              element={Boards}
              isLoggedIn={isLoggedIn}
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
        <Route
          path={myTeam}
          element={
            <ProtectedRoute
              element={MyTeam}
              isLoggedIn={isLoggedIn}
              isLoading={false}
            />
          }
        />
        <Route
          path={analytics}
          element={
            <ProtectedRoute element={AnalyticsPage} isLoggedIn={isLoggedIn} />
          }
        />
        {/* страница без роута */}
        <Route path={anyPage} element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
