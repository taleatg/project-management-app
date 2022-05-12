import { Grid, Paper, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import { ColumnData } from '../../../services/interfaces';
import { CreateTask } from '../tasks/CreateTask';
import { Tasks } from '../tasks/Tasks';
import { useAppSelector } from '../../../store/store';

export function Column(props: { column: ColumnData }) {
  const { status } = useAppSelector((state) => state.columnReducer);

  return (
    <Grid item className="columnList_item">
      <div className="title-column">
        <TextField size="small" label={props.column.title} margin="normal" />
        <Button>
          <AddIcon />
        </Button>
      </div>
      <Paper className="columnList_column">
        <CreateTask
          columnId={props.column.id}
          button={
            <>
              <AddIcon fontSize="small" /> Add task
            </>
          }
        />
        <div>{status === 'resolved' ? <Tasks columnId={props.column.id} /> : null}</div>
      </Paper>
    </Grid>
  );
}
