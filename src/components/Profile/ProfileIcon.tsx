import React, { useEffect, useState } from 'react';
import { Avatar, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { authSlice } from '../../store/reducers/authenticationSlice';
import { getUser } from '../../services/authorizationService';

export const ProfileIcon = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { setUserInfo } = authSlice.actions;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { userId, currentUser } = useAppSelector((state) => state.authReducer);

  const getUserInfo = async () => {
    const info = await getUser(userId);
    dispatch(setUserInfo(info));
  };

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = async () => {
    navigate('/profile');
    handleClose();
  };

  const handleEditProfileClick = () => {
    navigate('/edit');
    handleClose();
  };

  return (
    <div>
      <Tooltip title={currentUser.name}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <Avatar>{currentUser.name.slice(0, 2)}</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
        <MenuItem onClick={handleEditProfileClick}>Edit profile</MenuItem>
      </Menu>
    </div>
  );
};
