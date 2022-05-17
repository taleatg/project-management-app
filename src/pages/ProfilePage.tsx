import React from 'react';
import { Container, Paper, Typography } from '@mui/material';
import { useAppSelector } from '../store/store';

export const ProfilePage = () => {
  const { currentUserData } = useAppSelector((state) => state.authReducer);

  return (
    <Container maxWidth="xl">
      <div className="profile-page">
        <Typography variant="h4" component="div" gutterBottom>
          Profile
        </Typography>
        <Paper className="profile__info">
          <div className="profile__avatar" />
          <Typography variant="h5" component="div" gutterBottom noWrap className="profile__name">
            {currentUserData.name}
          </Typography>
          <Typography variant="h5" component="div" gutterBottom noWrap className="profile__login">
            {currentUserData.login}
          </Typography>
        </Paper>
      </div>
    </Container>
  );
};
