import React from 'react';
import { Container } from '@mui/material';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <Container maxWidth="xl">
      <h2>HomePage</h2>
      <Link to={`/board`} className="link">
        <div>Board 1</div>
      </Link>
      <Link to={`/board`} className="link">
        <div>Board 2</div>
      </Link>
    </Container>
  );
};
