import { Preloader } from '@ui';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import {
  getUserData,
  userIsAuthChecked,
  userIsAuthenticated
} from '../../services/slices/userSlice';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({ onlyUnAuth }: ProtectedRouteProps) => {
  const location = useLocation();

  const data = useSelector(getUserData);
  const isAuthChecked = useSelector(userIsAuthChecked);
  const isAuthenticated = useSelector(userIsAuthenticated);

  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && isAuthenticated) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  if (isAuthChecked) {
    return <Preloader />;
  }

  return <Outlet />;
};
