import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import './Header.scss';
import LangSelect from '../LangSelect';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { authSlice } from '../../store/reducers/authenticationSlice';
import NewBoardModal from '../NewBoardModal/NewBoardModal';
import { useCookies } from 'react-cookie';
import { ProfileIcon } from '../Profile/ProfileIcon';
import { Tooltip, Zoom } from '@mui/material';
import { useTranslation } from 'react-i18next';

type IPages = {
  [key: string]: string;
};

export const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { switchAuthorization } = authSlice.actions;
  const { isAuthenticated } = useAppSelector((state) => state.authReducer);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const removeCookie = useCookies(['token', 'userId'])[2];
  const { t } = useTranslation();

  const pages: IPages = isAuthenticated
    ? {
        welcome: t('button.welcome'),
        home: t('button.main'),
        edit: t('button.edit_profile'),
      }
    : { welcome: t('button.welcome') };

  const keys = Object.keys(pages);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const clickLogoutHandler = () => {
    navigate('/welcome');
    removeCookie('token');
    removeCookie('userId');
    localStorage.removeItem('userData');
    dispatch(switchAuthorization(false));
  };

  const clickBackToMainHandler = () => {
    navigate('/home');
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            className="logo"
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          />

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {keys.map((key) => (
                <MenuItem key={key} onClick={handleCloseNavMenu}>
                  <Link to={`/${key}`} className={'link link__burger-menu'}>
                    {pages[key]}
                  </Link>
                </MenuItem>
              ))}
              {isAuthenticated && (
                <MenuItem key="new-board" onClick={handleCloseNavMenu}>
                  <Link to="/home" className={'link link__burger-menu'}>
                    <NewBoardModal place="burger-menu" />
                  </Link>
                </MenuItem>
              )}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          />
          <Box
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, color: 'red' }}
            className="menu-buttons-box"
          >
            {keys.map((key) => (
              <Button key={key} sx={{ my: 2, color: 'blue', display: 'block' }}>
                <Link to={`/${key}`} className="link link__menu">
                  {pages[key]}
                </Link>
              </Button>
            ))}
            {isAuthenticated && (
              <Link to={'/home'} className="link link__menu">
                <NewBoardModal place="menu" />
              </Link>
            )}
          </Box>
          <LangSelect />
          {isAuthenticated ? (
            <>
              <Tooltip
                title={t('button.go_to_main')}
                TransitionComponent={Zoom}
                arrow
                color="inherit"
                onClick={clickBackToMainHandler}
              >
                <IconButton>
                  <DirectionsRunIcon sx={{ transform: 'scale(-1, 1)' }} />
                </IconButton>
              </Tooltip>
              <ProfileIcon />
              <Tooltip
                title={t('button.sign_out')}
                TransitionComponent={Zoom}
                arrow
                color="inherit"
                onClick={clickLogoutHandler}
              >
                <IconButton>
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <>
              <Link to={`/signin`} className="link link__menu">
                <Button color="inherit">{t('button.sign_in')}</Button>
              </Link>
              <Link to={`/signup`} className="link link__menu">
                <Button color="inherit">{t('button.sign_up')}</Button>
              </Link>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
