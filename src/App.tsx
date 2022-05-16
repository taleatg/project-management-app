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
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { authSlice } from './store/reducers/authenticationSlice';
import { SignupPage } from './pages/SignupPage';

function App() {
  const { setUserId } = authSlice.actions;
  const dispatch = useAppDispatch();
  const [cookies] = useCookies(['token', 'userId']);
  const { switchAuthorization } = authSlice.actions;

  if (cookies.token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.token}`;
    dispatch(switchAuthorization(true));
    dispatch(setUserId(cookies.userId));
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
            path="/board/:boardId/"
            element={
              <PrivateRoute>
                <BoardPage />
              </PrivateRoute>
            }
          />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
