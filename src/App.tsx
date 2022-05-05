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

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
