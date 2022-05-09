import React, { useEffect } from 'react';
import { CircularProgress, Container, Grid, Paper, TextField } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Button from '@mui/material/Button';
import { getColumnsList } from '../services/columnService';
import { useAppDispatch, useAppSelector } from '../store/store';
import { CreateColumn } from '../columns/CreateColumn';

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
        <CreateColumn
          button={
            <>
              <AddBoxIcon />
              Add column
            </>
          }
        />
        {allColumns.length !== 0 && (
          <Button>
            <AddBoxIcon /> {'Add task'}
          </Button>
        )}
      </div>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className="columnList">
        {status === 'resolved' &&
          allColumns.length !== 0 &&
          allColumns.map((column) => (
            <Grid item key={column.order} className="columnList_item">
              <TextField size="small" label={column.title} margin="normal" />
              <Paper className="columnList_column" />
            </Grid>
          ))}
      </Grid>
      {status === 'rejected' && <h4>Error! Something went wrong :( </h4>}
      {status === 'pending' && <CircularProgress />}
    </Container>
  );
};
