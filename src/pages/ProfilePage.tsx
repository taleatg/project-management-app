import React from 'react';
import { Container, Paper, Typography } from '@mui/material';
import { useAppSelector } from '../store/store';

export const ProfilePage = () => {
  const { currentUser } = useAppSelector((state) => state.authReducer);

  return (
    <Container maxWidth="xl">
      <div className="profile-page">
        <Typography variant="h4" component="div" gutterBottom>
          Profile
        </Typography>
        <Paper className="profile__info">
          <Typography variant="h6" component="div" gutterBottom noWrap>
            Name: {currentUser.name}
          </Typography>
          <Typography variant="h6" component="div" gutterBottom noWrap>
            Login: {currentUser.login}
          </Typography>
        </Paper>
      </div>
    </Container>
  );
};
