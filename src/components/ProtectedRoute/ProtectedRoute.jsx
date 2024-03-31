import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ENDPOINT_ROUTES } from '../../constants/constantsEndpointRoute.js';

function ProtectedRoute() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn.isLoggedIn);

  return isLoggedIn ? <Outlet /> : <Navigate to={ENDPOINT_ROUTES.login} />;
}

export default ProtectedRoute;
