import React, { useEffect } from 'react';
import { CircularProgress, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { getBoardsList } from '../services/boardService';
import { useAppDispatch, useAppSelector } from '../store/store';

export const HomePage = () => {
  const { token } = useAppSelector((state) => state.authReducer);
  const { status, allBoard } = useAppSelector((state) => state.boardReducer);
  const dispatch = useAppDispatch();

  async function fetchData() {
    await dispatch(getBoardsList(token));
  }

  useEffect(() => {
    fetchData();
  }, [dispatch, token]);

  return (
    <Container maxWidth="xl">
      <h2>HomePage</h2>
      {status === 'resolved' &&
        allBoard.length !== 0 &&
        allBoard.map((board) => (
          <Link to={`/board`} className="link" key={board.id}>
            <button>{board.title}</button>
          </Link>
        ))}
      {status === 'rejected' && <h4>Error! Something went wrong :( </h4>}
      {status === 'pending' && <CircularProgress />}
    </Container>
  );
};
