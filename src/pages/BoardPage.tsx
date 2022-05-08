import React, { useEffect } from 'react';
import { CircularProgress, Container, Grid, Paper } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Button from '@mui/material/Button';
import { getColumnsList } from '../services/columnService';
import { useAppDispatch, useAppSelector } from '../store/store';

export const BoardPage = () => {
  const { id, title } = useAppSelector((state) => state.boardReducer.currentBoard);
  const { token } = useAppSelector((state) => state.authReducer);
  const { status, allColumns } = useAppSelector((state) => state.columnReducer);
  const dispatch = useAppDispatch();

  async function fetchData(): Promise<void> {
    await dispatch(getColumnsList({ token, id }));
  }

  useEffect(() => {
    fetchData();
  }, [dispatch, token]);

  return (
    <Container maxWidth="xl">
      <h2>{title}</h2>
      <div className="columnButtons">
        <Button>
          <AddBoxIcon /> {'Add column'}
        </Button>
        {allColumns.length !== 0 && (
          <Button>
            <AddBoxIcon /> {'Add task'}
          </Button>
        )}
      </div>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className="colomnList">
        {status === 'resolved' &&
          allColumns.length !== 0 &&
          allColumns.map((column) => (
            <Grid item key={column.order} className="colomnList_item">
              <Paper className="colomnList_column">
                <div>{column.title}</div>
              </Paper>
            </Grid>
          ))}
      </Grid>
      {status === 'rejected' && <h4>Error! Something went wrong :( </h4>}
      {status === 'pending' && <CircularProgress />}
    </Container>
  );
};
