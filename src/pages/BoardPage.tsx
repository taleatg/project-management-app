import React, { useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { getColumnsList } from '../services/columnService';
import { useAppDispatch, useAppSelector } from '../store/store';
import { CreateColumn } from '../components/boards/columns/CreateColumn';
import { Column } from '../components/boards/columns/Column';
import { BackendResponse } from '../components/authorization-form/BackendResponse';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate, useParams } from 'react-router-dom';
import { getBoardById } from '../services/boardService';
import { useTranslation } from 'react-i18next';
import { Loading } from '../components/Loading';
import { columnSlice } from '../store/reducers/columnSlice';

export const BoardPage = () => {
  const { title } = useAppSelector((state) => state.boardReducer.currentBoard);
  const { removeAllColumns } = columnSlice.actions;
  const { status, allColumns } = useAppSelector((state) => state.columnReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const boardId: string = params.boardId as string;
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getBoardById(boardId));
    dispatch(getColumnsList(boardId));
    return function cleanup() {
      dispatch(removeAllColumns());
    };
  }, [dispatch, boardId, removeAllColumns]);

  return (
    <Container maxWidth="xl">
      <div className="topBoardPage">
        <h2>{title}</h2>
        <Button
          variant={'contained'}
          startIcon={<HomeIcon />}
          onClick={() => navigate('/home')}
          sx={{
            width: '180px',
            height: '40px',
            lineHeight: 'inherit',
            mt: '10px',
          }}
        >
          {t('button.back_to_main')}
        </Button>
      </div>
      <div className="columnButtons">
        <CreateColumn
          button={
            <div className="add-column">
              <AddBoxIcon />
              {t('board.add_column')}
            </div>
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
          allColumns.map((column) => <Column key={`${column.id}-1`} column={column} />)}
      </Grid>
      {status === 'rejected' && <BackendResponse backendErrors={t('errors.wrong')} type="error" />}
      {status === 'pending' && <Loading />}
    </Container>
  );
};
