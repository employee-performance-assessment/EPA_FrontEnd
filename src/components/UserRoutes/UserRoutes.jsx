import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ENDPOINT_ROUTES } from '../../constants/constantsEndpointRoute.js';
import SideMenu from '../SideMenu/SideMenu.jsx';

function UserRoutes() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn.isLoggedIn);

  return isLoggedIn ? (
    <div className="page-container">
      <div className="page-container__sidemenu">
        <SideMenu />
      </div>
      <Outlet />
    </div>
  ) : <Navigate to={ENDPOINT_ROUTES.login} />;
}

export default UserRoutes;
