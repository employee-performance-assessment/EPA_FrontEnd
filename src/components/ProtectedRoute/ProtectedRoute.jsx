import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { endpoint } from '../../constants/constantsEndpointRoute.js';

function ProtectedRoute({ element: Component, ...props }) {
  const { login } = endpoint;
  const isLoggedIn = useSelector((state) => state.isLoggedIn.isLoggedIn);

  return isLoggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to={login} replace />
  );
}

export default ProtectedRoute;
