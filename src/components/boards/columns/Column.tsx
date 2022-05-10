import { Grid, Paper, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';

export function Column(props: { title: string }) {
  return (
    <Grid item className="columnList_item">
      <div className="title-column">
        <TextField size="small" label={props.title} margin="normal" />
        <Button>
          <AddIcon />
        </Button>
      </div>
      <Paper className="columnList_column">
        <>
          <Button size="small" fullWidth sx={{ textTransform: 'none' }}>
            <AddIcon fontSize="small" /> {'Add task'}
          </Button>
        </>
      </Paper>
    </Grid>
  );
}
