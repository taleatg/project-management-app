import React from 'react';
import { Container } from '@mui/material';
import { AuthForm } from '../authorization form/AuthForm';

export const LoginPage = () => {
  return (
    <Container maxWidth="xl">
      <AuthForm />
    </Container>
  );
};
