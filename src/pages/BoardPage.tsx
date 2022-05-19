import React, { useEffect } from 'react';
import { CircularProgress, Container, Grid } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { getColumnsList } from '../services/columnService';
import { useAppDispatch, useAppSelector } from '../store/store';
import { CreateColumn } from '../components/boards/columns/CreateColumn';
import { Column } from '../components/boards/columns/Column';
import { BackendResponse } from '../components/authorization form/BackendResponse';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate, useParams } from 'react-router-dom';
import { getBoardById } from '../services/boardService';
import { useTranslation } from 'react-i18next';

export const BoardPage = () => {
  const { title } = useAppSelector((state) => state.boardReducer.currentBoard);
  const { status, allColumns } = useAppSelector((state) => state.columnReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const boardId: string = params.boardId as string;
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getBoardById(boardId));
    dispatch(getColumnsList(boardId));
  }, [dispatch, boardId]);

  return (
    <Container maxWidth="xl">
      <div className="topBoardPage">
        <h2>{title}</h2>
        <Button variant={'contained'} startIcon={<HomeIcon />} onClick={() => navigate('/home')}>
          Back to Home Page
        </Button>
      </div>
      <div className="columnButtons">
        <CreateColumn
          button={
            <>
              <AddBoxIcon />
              Add column
            </>
          }
        />
      </div>
      <Grid
        container
        rowSpacing={2}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        className="columnList"
        flexWrap="nowrap"
        marginLeft="10px"
      >
        {status === 'resolved' &&
          allColumns.length !== 0 &&
          allColumns.map((column) => <Column key={column.id} column={column} />)}
      </Grid>
      {status === 'rejected' && <BackendResponse backendErrors={t('errors.wrong')} type="error" />}
      {status === 'pending' && <CircularProgress />}
    </Container>
  );
};
