import { useEffect } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { jwtDecode } from 'jwt-decode';
import UserRoutes from '../UserRoutes/UserRoutes.jsx';
import AdminRoutes from '../AdminRoutes/AdminRoutes.jsx';

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
import PersonalAreaEditing from '../../pages/PersonalAreaEditing/PersonalAreaEditing.jsx';
import AssessmentBlock from '../../pages/AssesmentBlock/AssessmentBlock.jsx';
import Questionnaire from '../Questionnaire/Questionnaire.jsx';
import InfoPopup from '../InfoPopup/InfoPopup.jsx';
import Loader from '../Loader/Loader.jsx';

import { ENDPOINT_ROUTES } from '../../constants/constantsEndpointRoute.js';

import { getUserData } from '../../utils/mainApi.js';
import { setUser } from '../../store/slices/userSlice.js';
import { useErrorHandler } from '../../hooks/useErrorHandler.js';
import useLoading from '../../hooks/useLoader.js';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { popupText, isPopupOpen, closePopup, handleError } = useErrorHandler();
  const { isLoading, setLoading } = useLoading();
  const {
    login,
    register,
    personalArea,
    personalAreaEditing,
    myTeam,
    board,
    anyPage,
    analytics,
    criteria,
    cardsEmployees,
    userArea,
    ratingCards,
    taskCards,
    estimate,
    questionnaire,
  } = ENDPOINT_ROUTES;

  const tokenCheck = () => {
    setLoading(true);
    if (localStorage.getItem('token')) {
      const { token } = JSON.parse(localStorage.getItem('token'));
      if (token) {
        const decodedToken = jwtDecode(token);
        const expirationTime = decodedToken.exp * 1000;
        const currentTime = Date.now();
        if (currentTime < expirationTime) {
          getUserData()
            .then((res) => {
              if (res) {
                navigate(location.pathname);
                dispatch(setUser(res));
              }
            })
            .catch((err) => handleError(err))
            .finally(() => setLoading(false));
        } else {
          localStorage.removeItem('token');
          navigate(login);
        }
      }
    } else {
      navigate(login);
      setLoading(false);
    }
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  return (
    <div className="page">
      {isLoading && <Loader />}
      {isPopupOpen && (
        <InfoPopup text={popupText} handleClosePopup={closePopup} />
      )}
      <Routes>
        <Route path="/" element={<Navigate to={login} />} />
        <Route path={register} element={<Register />} />
        <Route path={login} element={<Auth />} />
        <Route path="" element={<AdminRoutes />}>
          <Route path={personalArea} element={<PersonalArea />} />
          <Route path={personalAreaEditing} element={<PersonalAreaEditing />} />
          <Route path={myTeam} element={<MyTeam />} />
          <Route path={criteria} element={<AssessmentCriteria />} />
          <Route
            index="true"
            path={`${cardsEmployees}/:id`}
            element={<EmployeeViewPage />}
          />
          <Route path={`${cardsEmployees}/:id/search/:keyword`} element={<EmployeeViewPage />} />
          <Route
            path={`${ratingCards}/:employeeId/:questionnaireId`}
            element={<EmployeeRatingPage />}
          />
        </Route>
        <Route path="" element={<UserRoutes />}>
          <Route path={userArea} element={<EmployeeViewPage />} />
          <Route
            path={`${ratingCards}/:questionnaireId`}
            element={<EmployeeRatingPage />}
          />
          <Route path={board} element={<Kanban />} />
          <Route
            index="true"
            path={`${taskCards}/:id`}
            element={<TaskViewPage />}
          />
          <Route path="/search/:keyword" element={<TaskViewPage />} />
          {/* <Route path={`${taskCards}/:id/search/:keyword`} element={<TaskViewPage />} /> */}
          <Route path={estimate} element={<AssessmentBlock />} />
          <Route
            path={`${questionnaire}/:date/:questionnaireId/:employeeId`}
            element={<Questionnaire />}
          />
          <Route path={analytics} element={<AnalyticsPage />} />
        </Route>
        <Route path={anyPage} element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
