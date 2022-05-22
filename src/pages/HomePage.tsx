import React, { useEffect } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  InputAdornment,
  Paper,
  TextField,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { deleteBoard, getBoardsList } from '../services/boardService';
import { useAppDispatch, useAppSelector } from '../store/store';
import ConfirmationModal from '../components/ConfirmationModal';
import './Pages.scss';
import { BoardPreview } from '../components/BoardPreview';
import { useTranslation } from 'react-i18next';
import { getCookie } from '../services/authorizationService';
import SearchIcon from '@mui/icons-material/Search';
import { FieldValues, SubmitHandler, useForm, Controller } from 'react-hook-form';

export const HomePage = () => {
  const { status, allBoard } = useAppSelector((state) => state.boardReducer);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { handleSubmit, control, reset } = useForm();
  const navigate = useNavigate();

  async function deleteData(id: string): Promise<void> {
    await dispatch(deleteBoard(id));
  }

  useEffect(() => {
    const token = getCookie('token') as string;
    dispatch(getBoardsList(token));
  }, [dispatch]);

  const searchHandler: SubmitHandler<FieldValues> = (data) => {
    navigate('/search');
    reset();
  };

  return (
    <Container maxWidth="xl">
      <div className="title-wrapper">
        <h2>{t('board.board')}</h2>
        <Paper className="search" component="form">
          <Controller
            control={control}
            name="search"
            defaultValue=""
            render={({ field }) => (
              <>
                <InputAdornment position="start" sx={{ ml: '5px' }}>
                  <SearchIcon />
                </InputAdornment>
                <TextField
                  variant="standard"
                  InputProps={{ disableUnderline: true }}
                  placeholder={t('board.search_task')}
                  onChange={(e) => field.onChange(e)}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              </>
            )}
          />
          <Button
            color="primary"
            sx={{ p: '10px' }}
            aria-label="directions"
            type="submit"
            onClick={handleSubmit(searchHandler)}
          >
            {t('button.submit')}
          </Button>
        </Paper>
      </div>
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
