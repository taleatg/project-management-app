import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { WelcomePage } from './pages/welcome-page/WelcomePage';
import { BoardPage } from './pages/BoardPage';
import { Layout } from './components/Layout';
import { NotFoundPage } from './pages/NotFoundPage';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { EditProfilePage } from './pages/EditProfilePage';
import { useAppDispatch } from './store/store';
import { PrivateRoute } from './components/PrivateRoute';
import './axiosConfig';
import axios, { AxiosRequestTransformer } from 'axios';
import { useCookies } from 'react-cookie';
import { authSlice } from './store/reducers/authenticationSlice';
import { ProfilePage } from './pages/ProfilePage';
import { getCookie } from './services/authorizationService';

type CommonHeaders = {
  [key: string]: string;
};

function App() {
  const { setUserId, setCurrentUserData } = authSlice.actions;
  const dispatch = useAppDispatch();
  const [cookies] = useCookies(['token', 'userId']);
  const { switchAuthorization } = authSlice.actions;

  axios.defaults.transformRequest = ((data, headers: CommonHeaders) => {
    const token = getCookie('token');
    (headers.common as unknown as CommonHeaders)['Authorization'] = `Bearer ${token}`;
    return data;
  }) as AxiosRequestTransformer;

  if (cookies.token) {
    dispatch(setUserId(cookies.userId));
    if (localStorage.getItem('userData')) {
      dispatch(setCurrentUserData(JSON.parse(localStorage.getItem('userData') as string)));
    }
    dispatch(switchAuthorization(true));
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit"
            element={
              <PrivateRoute>
                <EditProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/board/:boardId/"
            element={
              <PrivateRoute>
                <BoardPage />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
