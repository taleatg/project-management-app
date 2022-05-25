import { Header } from './header/Header';
import { Outlet } from 'react-router-dom';
import { Footer } from './footer/Footer';

export const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
