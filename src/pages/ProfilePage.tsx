import React from 'react';
import { Container, Paper, Typography } from '@mui/material';
import { useAppSelector } from '../store/store';
import { useTranslation } from 'react-i18next';

export const ProfilePage = () => {
  const { currentUserData } = useAppSelector((state) => state.authReducer);
  const { t } = useTranslation();

  return (
    <Container maxWidth="xl">
      <div className="profile-page">
        <Typography variant="h4" component="div" gutterBottom>
          {t('profile.profile')}
        </Typography>
        <Paper className="profile__info">
          <div className="profile__avatar" />
          <Typography variant="h5" component="div" gutterBottom noWrap className="profile__text">
            <p className="title">{t('authorization.name')}:</p>
            {currentUserData.name}
          </Typography>
          <Typography variant="h5" component="div" gutterBottom noWrap className="profile__text">
            <p className="title">{t('authorization.login')}:</p>
            {currentUserData.login}
          </Typography>
        </Paper>
      </div>
    </Container>
  );
};
