import React from 'react';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="xl">
      <h2>Page not found</h2>
      <Button variant={'contained'} onClick={() => navigate('/welcome')}>
        Go to Welcome Page
      </Button>
    </Container>
  );
};
