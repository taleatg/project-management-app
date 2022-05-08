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
import { Provider } from 'react-redux';
import store from './store/store';
import { PrivateRoute } from './routing/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
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
              path="/board"
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
      </Provider>
    </BrowserRouter>
  );
}

export default App;
