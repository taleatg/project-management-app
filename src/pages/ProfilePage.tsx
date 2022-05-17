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
          <Typography variant="h6" component="div" gutterBottom noWrap>
            Name: {currentUserData.name}
          </Typography>
          <Typography variant="h6" component="div" gutterBottom noWrap>
            Login: {currentUserData.login}
          </Typography>
        </Paper>
      </div>
    </Container>
  );
};
