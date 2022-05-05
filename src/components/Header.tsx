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

const pages = ['Welcome', 'Home'];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

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
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            LOGO
          </Typography>

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
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link to={`/${page}`} className={'link link__burger-menu'}>
                      {page}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
              <MenuItem key="edit-profile" onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <Link to={'/edit-profile'} className={'link link__burger-menu'}>
                    Edit profile
                  </Link>
                </Typography>
              </MenuItem>
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
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'blue', display: 'block' }}
              >
                <Link to={`/${page}`} className="link link__menu">
                  {page}
                </Link>
              </Button>
            ))}
            <Button
              key="create-new-board"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Create new board
            </Button>
            <Button
              key="edit-profile"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'blue', display: 'block' }}
            >
              <Link to={'/edit-profile'} className="link link__menu">
                Edit profile
              </Link>
            </Button>
          </Box>
          <Link to={`/login`} className="link link__menu">
            <Button color="inherit">Logout</Button>
          </Link>
          <Link to={`/login`} className="link link__menu">
            <Button color="inherit">Login</Button>
          </Link>
          <Link to={`/login`} className="link link__menu">
            <Button color="inherit">Sign up</Button>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
