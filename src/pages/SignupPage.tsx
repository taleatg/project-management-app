import React from 'react';
import { Container } from '@mui/material';
import { AuthForm } from '../components/authorization-form/AuthForm';

export const SignupPage = () => {
  return (
    <Container maxWidth="xl">
      <AuthForm whichPage="signup" />
    </Container>
  );
};
