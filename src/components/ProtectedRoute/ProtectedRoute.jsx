import React from 'react';
import { Navigate } from 'react-router-dom';
import { endpoint } from '../../constants/constantsEndpointRoute.js';
import Preloader from '../Preloader/Preloader.jsx';
// этот компонент принимает другой компонент в качестве пропса
// он также может взять неограниченное число пропсов и передать их новому компоненту
<<<<<<< HEAD
function ProtectedRoute({ element: Component, ...props }) {
=======
const ProtectedRoute = ({ element: Component, ...props }) => {
>>>>>>> 6e720b665f0eb5abdcfb4386ee404cf291466178
  const { main } = endpoint;
  return props.isLoading ? (
    <Preloader />
  ) : props.isLoggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to={main} replace />
  );
<<<<<<< HEAD
}
=======
};
>>>>>>> 6e720b665f0eb5abdcfb4386ee404cf291466178

export default ProtectedRoute;
