import React, { useEffect } from 'react';
import { Box, CircularProgress, Container, Divider, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { deleteBoard, getBoardsList } from '../services/boardService';
import { useAppDispatch, useAppSelector } from '../store/store';
import ConfirmationModal from '../components/ConfirmationModal';
import './Pages.scss';
import { BoardPreview } from '../components/BoardPreview';

export const HomePage = () => {
  const { token } = useAppSelector((state) => state.authReducer);
  const { status, allBoard } = useAppSelector((state) => state.boardReducer);
  const dispatch = useAppDispatch();

  async function fetchData(): Promise<void> {
    await dispatch(getBoardsList(token));
  }

  async function deleteData(id: string): Promise<void> {
    await dispatch(deleteBoard({ id, token }));
  }

  useEffect(() => {
    fetchData();
  }, [dispatch, token]);

  return (
    <Container maxWidth="xl">
      <h2>Boards</h2>
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          className="boardList"
        >
          {status === 'resolved' &&
            allBoard.length !== 0 &&
            allBoard.map((board) => (
              <Grid item key={board.id} className="boardList_item">
                <Link to={`/board`} className="link">
                  <Paper className="boardList_board">
                    <BoardPreview board={board} />
                  </Paper>
                </Link>
                <ConfirmationModal
                  textButton={'delete board'}
                  confirmedAction={() => deleteData(board.id)}
                />
                <Divider />
              </Grid>
            ))}
        </Grid>
      </Box>
      {status === 'rejected' && <h4>Error! Something went wrong :( </h4>}
      {status === 'pending' && <CircularProgress />}
    </Container>
  );
};
