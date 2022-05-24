import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/store';
import { getUserById } from '../services/authorizationService';
import { authSlice } from '../store/reducers/authenticationSlice';
import { useEffect, useRef } from 'react';
import axios from 'axios';

export function Redirect({ children }: { children: JSX.Element }) {
  const { isAuthenticated, userId } = useAppSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const { switchAuthorization } = authSlice.actions;
  const dispatch = useAppDispatch();
  const timer: { current: NodeJS.Timeout | undefined } = useRef();

  axios.defaults.transformResponse = (data) => {
    if (data) {
      if (JSON.parse(data).statusCode === 401) {
        dispatch(switchAuthorization(false));
        navigate('/welcome');
      } else {
        return JSON.parse(data);
      }
    }
  };

  async function check() {
    const response = await getUserById(userId);
    if (response?.statusCode !== 401) {
      timer.current = setTimeout(check, 1000 * 5 * 60);
    } else {
      clearTimeout(timer.current as NodeJS.Timeout);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      timer.current = setTimeout(check, 1000);
    }
    return () => {
      if (timer.current !== undefined) {
        clearTimeout(timer.current as NodeJS.Timeout);
      }
    };
  }, [isAuthenticated]);

  return <div className="root-wrapper">{children}</div>;
}
