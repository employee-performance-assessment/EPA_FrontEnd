import { Navigate } from 'react-router-dom';
import { endpoint } from '../../constants/constantsEndpointRoute.js';
import Preloader from '../Preloader/Preloader.jsx';
// этот компонент принимает другой компонент в качестве пропса
// он также может взять неограниченное число пропсов и передать их новому компоненту
function ProtectedRoute({ element: Component, ...props }) {
  const { main } = endpoint;
  return props.isLoading ? (
    <Preloader />
  ) : props.isLoggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to={main} replace />
  );
}

export default ProtectedRoute;
