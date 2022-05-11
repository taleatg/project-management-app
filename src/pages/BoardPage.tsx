import React, { useEffect } from 'react';
import { CircularProgress, Container, Grid } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { getColumnsList } from '../services/columnService';
import { useAppDispatch, useAppSelector } from '../store/store';
import { CreateColumn } from '../components/boards/columns/CreateColumn';
import { Column } from '../components/boards/columns/Column';
import { BackendResponse } from '../components/authorization form/BackendResponse';

export const BoardPage = () => {
  const { id, title } = useAppSelector((state) => state.boardReducer.currentBoard);
  const { token } = useAppSelector((state) => state.authReducer);
  const { status, allColumns } = useAppSelector((state) => state.columnReducer);
  const dispatch = useAppDispatch();

  async function fetchData(): Promise<void> {
    await dispatch(getColumnsList(id));
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
          allColumns.map((column) => <Column key={column.order} id={column.id} />)}
      </Grid>
      {status === 'rejected' && (
        <BackendResponse backendErrors="Error! Something went wrong :(" type="error" />
      )}
      {status === 'pending' && <CircularProgress />}
    </Container>
  );
};
