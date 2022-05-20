import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/store';
import { getUserById } from '../services/authorizationService';
import { authSlice } from '../store/reducers/authenticationSlice';
import { useEffect } from 'react';
import axios from 'axios';

export function Redirect({ children }: { children: JSX.Element }) {
  const { isAuthenticated, userId } = useAppSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const { switchAuthorization } = authSlice.actions;
  const dispatch = useAppDispatch();

  // проверка при каждом запросе: если ошибка "не авторизован" - редирект и логаут
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

  // тестовый запрос по таймауту через 5 минут: если ошибка "не авторизован" - редирект и логаут
  let checkTokenTimer: NodeJS.Timeout;

  if (isAuthenticated) {
    checkTokenTimer = setTimeout(check, 1000);
  }

  async function check() {
    const response = await getUserById(userId);
    if (response.statusCode !== 401) {
      checkTokenTimer = setTimeout(check, 1000 * 60 * 5);
    } else {
      clearTimeout(checkTokenTimer);
    }
  }

  // удаление таймаута при размонтировании компонента
  useEffect(() => {
    return function cleanup() {
      if (checkTokenTimer !== undefined) {
        clearTimeout(checkTokenTimer);
      }
    };
  });

  return <div>{children}</div>;
}
