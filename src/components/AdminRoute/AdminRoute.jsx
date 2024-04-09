import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SideMenu from '../SideMenu/SideMenu.jsx';
import { ENDPOINT_ROUTES } from '../../constants/constantsEndpointRoute.js';

function AdminRoute() {
  const user = useSelector((state) => state.user);

  return user && user.isAdmin ? (
    <div className="page-container">
      <div className="page-container__sidemenu">
        <SideMenu />
      </div>
      <Outlet />
    </div>
  ) : (
    <Navigate to={ENDPOINT_ROUTES.login} />
  );
}

export default AdminRoute;
