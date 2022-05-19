import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/store';
import { getCookie } from '../services/authorizationService';
import { authSlice } from '../store/reducers/authenticationSlice';

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const { switchAuthorization } = authSlice.actions;
  const dispatch = useAppDispatch();

  let checkTokenTimer = setTimeout(function check() {
    const token = getCookie('token');
    if (token) {
      checkTokenTimer = setTimeout(check, 5000);
    } else {
      dispatch(switchAuthorization(false));
    }
  }, 5000);

  const { isAuthenticated } = useAppSelector((state) => state.authReducer);
  return isAuthenticated ? children : <Navigate to="/welcome" />;
}
