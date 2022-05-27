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
import NewBoardModal from '../new-board-modal/NewBoardModal';
import { useCookies } from 'react-cookie';
import { ProfileIcon } from '../profile/ProfileIcon';
import { Divider, InputAdornment, Paper, TextField, Tooltip, Zoom } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import SearchIcon from '@mui/icons-material/Search';
import { searchSlice } from '../../store/reducers/searchSlice';
import { SearchResult } from '../../services/interfaces';
import { getColumnById } from '../../services/columnService';
import { searchTask } from '../../services/taskService';
import { getUserById } from '../../services/authorizationService';
import { getBoard } from '../../services/boardService';

type IPages = {
  [key: string]: string;
};

const header_outer = {
  height: '75px',
  position: 'sticky',
  top: '-25px',
  transition: '0.3s',
  background: '#484bee',
};

export const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { switchAuthorization } = authSlice.actions;
  const { isAuthenticated } = useAppSelector((state) => state.authReducer);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const removeCookie = useCookies(['token', 'userId'])[2];
  const { t } = useTranslation();
  const { handleSubmit, control, reset } = useForm();
  const { updateSearchResult, updateLoadingState } = searchSlice.actions;

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

  const searchHandler: SubmitHandler<FieldValues> = async (data) => {
    dispatch(updateLoadingState(true));
    navigate('/search');
    const resultTasks: SearchResult[] = [];
    const tasks = await searchTask();

    for (const task of tasks) {
      if (task.title.toLowerCase().includes(data.search.toLowerCase())) {
        resultTasks.push({
          board: (await getBoard(task.boardId)).title,
          column: (await getColumnById(task.boardId, task.columnId)).title,
          taskId: task.id,
          title: task.title,
          description: task.description,
          assignee: (await getUserById(task.userId)).name,
        });
      }
    }

    dispatch(updateSearchResult(resultTasks));
    dispatch(updateLoadingState(false));
    reset({ search: '' });
  };

  return (
    <AppBar sx={header_outer}>
      <Container maxWidth="xl" className="header-inner" sx={{ p: 0 }}>
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
          {isAuthenticated ? (
            <>
              <Paper className="search" component="form" sx={{ borderRadius: '25px' }}>
                <Controller
                  control={control}
                  name="search"
                  render={({ field }) => (
                    <TextField
                      autoComplete="off"
                      sx={{ pl: '15px' }}
                      variant="standard"
                      InputProps={{ disableUnderline: true }}
                      placeholder={t('board.search_task')}
                      onChange={(e) => field.onChange(e)}
                      value={field.value ?? ''}
                    />
                  )}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <Button
                  color="primary"
                  sx={{ minWidth: '20px' }}
                  type="submit"
                  onClick={handleSubmit(searchHandler)}
                >
                  <InputAdornment position="start" sx={{ ml: '5px', height: '100%' }}>
                    <SearchIcon />
                  </InputAdornment>
                </Button>
              </Paper>
              <LangSelect />
              <Tooltip
                title={t('button.go_to_main')}
                TransitionComponent={Zoom}
                arrow
                color="inherit"
                onClick={clickBackToMainHandler}
              >
                <IconButton sx={{ p: '0 5px 0 0' }}>
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
              <LangSelect />
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
