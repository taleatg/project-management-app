import React from 'react';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
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
import { ProfilePage } from './pages/ProfilePage';

function App() {
  const { switchAuthorization, setUserId } = authSlice.actions;
  const dispatch = useAppDispatch();
  const [cookies] = useCookies(['token', 'userId']);

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
          <Route path="/signin" element={cookies.token ? <Navigate to="/home" /> : <LoginPage />} />
          <Route
            path="/signup"
            element={cookies.token ? <Navigate to="/home" /> : <SignupPage />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
