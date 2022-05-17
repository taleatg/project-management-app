import React, { useState } from 'react';
import { Avatar, IconButton, Menu, MenuItem, Tooltip, Zoom } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getUserData } from '../../services/authorizationService';
import { authSlice } from '../../store/reducers/authenticationSlice';

export const ProfileIcon = () => {
  const { setCurrentUserData } = authSlice.actions;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { userId, currentUserData } = useAppSelector((state) => state.authReducer);

  const updateUserData = async () => {
    const userData = await getUserData(userId);
    dispatch(setCurrentUserData(userData));
  };

  updateUserData();

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
      <Tooltip TransitionComponent={Zoom} title={currentUserData.name} arrow>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <Avatar>{currentUserData.name.slice(0, 2)}</Avatar>
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
