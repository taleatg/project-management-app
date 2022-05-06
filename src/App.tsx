import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { WelcomePage } from './pages/WelcomePage';
import { BoardPage } from './pages/BoardPage';
import { Layout } from './components/Layout';
import { NotFoundPage } from './pages/NotFoundPage';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { EditProfilePage } from './pages/EditProfilePage';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<WelcomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/edit-profile" element={<EditProfilePage />} />
            <Route path="/board" element={<BoardPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
