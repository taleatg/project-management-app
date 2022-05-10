import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/store';

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAppSelector((state) => state.authReducer);
  return isAuthenticated ? children : <Navigate to="/welcome" />;
}
