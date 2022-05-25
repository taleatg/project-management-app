import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { WelcomePage } from './pages/welcome-page/WelcomePage';
import { BoardPage } from './pages/BoardPage';
import { Layout } from './components/Layout';
import { NotFoundPage } from './pages/NotFoundPage';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { EditProfilePage } from './pages/EditProfilePage';
import { useAppDispatch, useAppSelector } from './store/store';
import { PrivateRoute } from './components/PrivateRoute';
import './axiosConfig';
import { authSlice } from './store/reducers/authenticationSlice';
import { SignupPage } from './pages/SignupPage';
import { ProfilePage } from './pages/ProfilePage';
import { getCookie } from './services/authorizationService';
import { Redirect } from './components/Redirect';
import { SearchPage } from './pages/SearchPage';

function App() {
  const { switchAuthorization, setUserId, setCurrentUserData } = authSlice.actions;
  const { isAuthenticated } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();

  if (getCookie('token') && !isAuthenticated) {
    dispatch(setUserId(getCookie('userId') as string));
    if (localStorage.getItem('userData')) {
      dispatch(setCurrentUserData(JSON.parse(localStorage.getItem('userData') as string)));
    }
    dispatch(switchAuthorization(true));
  }

  return (
    <BrowserRouter>
      <Redirect>
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
            <Route
              path="/signin"
              element={isAuthenticated ? <Navigate to="/home" /> : <LoginPage />}
            />
            <Route
              path="/signup"
              element={isAuthenticated ? <Navigate to="/home" /> : <SignupPage />}
            />
            <Route
              path="/search"
              element={
                <PrivateRoute>
                  <SearchPage />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />{' '}
          </Route>
        </Routes>
      </Redirect>
    </BrowserRouter>
  );
}

export default App;
