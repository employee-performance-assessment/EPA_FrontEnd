import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ENDPOINT_ROUTES } from '../../constants/constantsEndpointRoute.js';
import SideMenu from '../SideMenu/SideMenu.jsx';

function ProtectedRoute() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn.isLoggedIn);
  const role = useSelector((state) => state.adminData.role);

  return isLoggedIn && role === 'ROLE_USER' ? (
    <div className="page-container">
    <div className="page-container__sidemenu">
      <SideMenu />
    </div>
    <Outlet />
  </div>
  ) : <Navigate to={ENDPOINT_ROUTES.login} />;
}

export default ProtectedRoute;
