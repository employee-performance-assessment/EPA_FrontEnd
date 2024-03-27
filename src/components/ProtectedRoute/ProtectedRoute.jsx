import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ENDPOINT_ROUTES } from '../../constants/constantsEndpointRoute.js';

function ProtectedRoute({ element: Component, ...props }) {
  const { login } = ENDPOINT_ROUTES;
  const isLoggedIn = useSelector((state) => state.isLoggedIn.isLoggedIn);

  return isLoggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to={login} replace />
  );
}

export default ProtectedRoute;
