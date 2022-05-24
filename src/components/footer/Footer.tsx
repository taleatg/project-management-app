import { Divider, Link } from '@mui/material';
import './Footer.scss';

export const Footer = (): JSX.Element => {
  return (
    <footer className="footer">
      <Divider />
      <div className="footer-container">
        <div className="year">© 2022</div>
        <div className="github-wrap">
          <div className="creator link">
            <Link
              href="https://github.com/taleatg"
              underline="hover"
              target="_blank"
              rel="noreferrer"
            >
              taleatg
            </Link>
          </div>
          <div className="creator link">
            <Link
              href="https://github.com/Alexivkov"
              underline="hover"
              target="_blank"
              rel="noreferrer"
            >
              Alexivkov
            </Link>
          </div>
          <div className="creator link">
            <Link
              href="https://github.com/dina-shchobova"
              underline="hover"
              target="_blank"
              rel="noreferrer"
            >
              dina-shchobova
            </Link>
          </div>
        </div>
        <a href="https://rs.school/react/" target="_blank" rel="noreferrer">
          <div className="rs-school link"></div>
        </a>
      </div>
    </footer>
  );
};
