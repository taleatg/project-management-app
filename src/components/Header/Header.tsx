import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import './Header.scss';
import LangSelect from '../LangSelect';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { authSlice } from '../../store/reducers/authenticationSlice';
import NewBoardModal from '../NewBoardModal/NewBoardModal';

type IPages = {
  [key: string]: string;
};

export const Header = () => {
  const dispatch = useAppDispatch();
  const { switchAuthorization } = authSlice.actions;
  const { isAuthenticated } = useAppSelector((state) => state.authReducer);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const pages: IPages = isAuthenticated
    ? {
        welcome: 'Welcome',
        home: 'Home',
        edit: 'Edit profile',
      }
    : { welcome: 'Welcome' };

  const keys = Object.keys(pages);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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
                  <Typography textAlign="center">
                    <Link to={`/${key}`} className={'link link__burger-menu'}>
                      {pages[key]}
                    </Link>
                  </Typography>
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
          >
            LOGO
          </Typography>
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
            <Link to={`/welcome`} className="link link__menu">
              <Button color="inherit" onClick={() => dispatch(switchAuthorization(false))}>
                Logout
              </Button>
            </Link>
          ) : (
            <Link to={`/login`} className="link link__menu">
              <Button color="inherit">Login / Sign Up</Button>
            </Link>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
