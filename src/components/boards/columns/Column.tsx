import { Grid, Paper, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import './Columns.scss';
import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { columnSlice } from '../../../store/reducers/columnSlice';
import { ColumnData } from '../../../services/interfaces';
import { putColumn } from '../../../services/columnService';

const styleTextField = {
  width: '160px',
};

export function Column(props: { id: string }) {
  const { changeColumn, selectedItem } = columnSlice.actions;
  const [isEdit, setIsEdit] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const { allColumns, currentColumn } = useAppSelector((state) => state.columnReducer);
  const { currentBoard } = useAppSelector((state) => state.boardReducer);
  const dispatch = useAppDispatch();

  const initTitle = (allColumns.find((column) => column.id === props.id) as ColumnData).title;

  const titleClickHandler = () => {
    const current = allColumns.find((column) => column.id === props.id) as ColumnData;
    dispatch(selectedItem(current));
    setIsEdit(true);
  };

  const confirmClickHandler = async () => {
    const updatedColumn = await putColumn(
      {
        title: newTitle,
        order: currentColumn.order,
      },
      currentBoard.id,
      currentColumn.id
    );
    await dispatch(changeColumn(updatedColumn));
    setIsEdit(false);
  };

  const cancelClickHandler = () => {
    setIsEdit(false);
  };

  return (
    <Grid item className="column">
      <div className="column__header">
        {isEdit ? (
          <>
            <IconButton aria-label="cancel" onClick={cancelClickHandler}>
              <DoDisturbIcon color="error" />
            </IconButton>
            <IconButton aria-label="check" onClick={confirmClickHandler}>
              <CheckIcon color="success" />
            </IconButton>
            <TextField
              label="Column title"
              defaultValue={initTitle}
              autoFocus={true}
              margin={'none'}
              sx={styleTextField}
              size="small"
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </>
        ) : (
          <>
            <div className="column__title" onClick={titleClickHandler}>
              {initTitle}
            </div>
            <IconButton aria-label="delete">
              <DeleteIcon color="primary" />
            </IconButton>
          </>
        )}
      </div>
      <Paper className="column__body">
        <>
          <Button size="small" fullWidth sx={{ textTransform: 'none' }}>
            <AddIcon fontSize="small" /> {'Add task'}
          </Button>
        </>
      </Paper>
    </Grid>
  );
}
