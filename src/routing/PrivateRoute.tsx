import { Navigate } from 'react-router-dom';

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const isAuthenticated = true; // TODO: get value from store

  return isAuthenticated ? children : <Navigate to="/welcome" />;
}
