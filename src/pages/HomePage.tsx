import React, { useEffect } from 'react';
import { Box, CircularProgress, Container, Divider, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { deleteBoard, getBoardsList } from '../services/boardService';
import { useAppDispatch, useAppSelector } from '../store/store';
import ConfirmationModal from '../components/ConfirmationModal';
import './Pages.scss';
import { BoardPreview } from '../components/BoardPreview';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';

export const HomePage = () => {
  const { status, allBoard } = useAppSelector((state) => state.boardReducer);
  const [cookies] = useCookies(['token']);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  async function deleteData(id: string): Promise<void> {
    await dispatch(deleteBoard(id));
  }

  useEffect(() => {
    dispatch(getBoardsList(cookies.token));
  }, [dispatch, cookies.token]);

  return (
    <Container maxWidth="xl">
      <h2>{t('board.board')}</h2>
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
                <Link to={`/board/${board.id}`} className="link">
                  <Paper className="boardList_board">
                    <BoardPreview board={board} />
                  </Paper>
                </Link>
                <ConfirmationModal confirmedAction={() => deleteData(board.id)} />
                <Divider />
              </Grid>
            ))}
        </Grid>
      </Box>
      {status === 'rejected' && <h4>{t('error')}</h4>}
      {status === 'pending' && <CircularProgress />}
    </Container>
  );
};
