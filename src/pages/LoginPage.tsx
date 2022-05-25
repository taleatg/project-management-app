import React from 'react';
import { Container } from '@mui/material';
import { AuthForm } from '../components/authorizationForm/AuthForm';

export const LoginPage = () => {
  return (
    <Container maxWidth="xl">
      <AuthForm whichPage="signin" />
    </Container>
  );
};
