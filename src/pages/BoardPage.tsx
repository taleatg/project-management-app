import React, { useEffect } from 'react';
import { CircularProgress, Container, Grid, Paper, TextField } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddIcon from '@mui/icons-material/Add';
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
          allColumns.map((column) => (
            <Grid item key={column.order} className="columnList_item">
              <div className="title-column">
                <TextField size="small" label={column.title} margin="normal" />
                <Button>
                  <AddIcon />
                </Button>
              </div>
              <Paper className="columnList_column">
                {allColumns.length !== 0 && (
                  <Button size="small" fullWidth sx={{ textTransform: 'none' }}>
                    <AddIcon fontSize="small" /> {'Add task'}
                  </Button>
                )}
              </Paper>
            </Grid>
          ))}
      </Grid>
      {status === 'rejected' && <h4>Error! Something went wrong :( </h4>}
      {status === 'pending' && <CircularProgress />}
    </Container>
  );
};
