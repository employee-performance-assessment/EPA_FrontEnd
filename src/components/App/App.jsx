import { useEffect } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.jsx';
import AdminRoute from '../AdminRoute/AdminRoute.jsx';

import Auth from '../../pages/Auth/Auth.jsx';
import Register from '../../pages/Register/Register.jsx';
import PersonalArea from '../../pages/PersonalArea/PersonalArea.jsx';
import MyTeam from '../../pages/MyTeam/MyTeam.jsx';
import Kanban from '../../pages/Kanban/Kanban.jsx';
import AnalyticsPage from '../../pages/AnalyticsPage/AnalyticsPage.jsx';
import NotFound from '../NotFound/NotFound.jsx';
import AssessmentCriteria from '../../pages/AssessmentCriteria/AssessmentCriteria.jsx';
import EmployeeViewPage from '../../pages/EmployeeViewPage/EmployeeViewPage.jsx';
import EmployeeRatingPage from '../../pages/EmployeeRatingPage/EmployeeRatingPage.jsx';
import TaskViewPage from '../../pages/TaskViewPage/TaskViewPage.jsx';

import { ENDPOINT_ROUTES } from '../../constants/constantsEndpointRoute.js';

import { getUserData } from '../../utils/mainApi.js';
import { setAdminData } from '../../store/slices/adminDataSlice.js';
import { setIsLoggedIn } from '../../store/slices/isLoggedInSlice.js';

function App() {
  // в cardsList записываем ответ на запрос get от API, задания со всеми параметрами
  const {
    login,
    register,
    personalArea,
    myTeam,
    board,
    anyPage,
    analytics,
    criteria,
    viewCards,
    viewRating,
    viewTask,
  } = ENDPOINT_ROUTES;
  const isLoggedIn = useSelector((state) => state.isLoggedIn.isLoggedIn);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

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
        <Route path={login} element={<Auth />} />
        <Route path="" element={<AdminRoute />}>
          <Route path={personalArea} element={<PersonalArea />} />
          <Route path={board} element={<Kanban />} />
          <Route path={myTeam} element={<MyTeam />} />
          <Route path={analytics} element={<AnalyticsPage />} />
          <Route path={criteria} element={<AssessmentCriteria />} />
          <Route path={viewCards} element={<EmployeeViewPage />} />
          <Route path={viewRating} element={<EmployeeRatingPage />} />
          <Route path={viewTask} element={<TaskViewPage />} />
        </Route>
        <Route path="" element={<ProtectedRoute />}>
          <Route path={anyPage} element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
