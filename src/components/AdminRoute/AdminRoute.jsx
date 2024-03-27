import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ENDPOINT_ROUTES } from '../../constants/constantsEndpointRoute.js';

function AdminRoute() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn.isLoggedIn);
  const role = useSelector((state) => state.adminData.role);

  return isLoggedIn && role === 'ROLE_ADMIN' ? (
    <Outlet />
  ) : (
    <Navigate to={ENDPOINT_ROUTES.login} />
  );
}

export default AdminRoute;
