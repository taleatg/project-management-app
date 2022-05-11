import { Grid, Paper, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import './Columns.scss';
import React, { ChangeEvent, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { columnSlice } from '../../../store/reducers/columnSlice';
import { columnAction } from '../../../services/columnService';
import { ColumnData } from '../../../services/interfaces';

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
    const path = `/boards/${currentBoard.id}/columns/${currentColumn.id}`;
    const method = 'put';
    const body = {
      title: newTitle,
      order: currentColumn.order,
    };
    const updatedColumn = await columnAction({ body, path, method });
    await dispatch(changeColumn(updatedColumn));
    setIsEdit(false);
  };

  const cancelClickHandler = () => {
    setIsEdit(false);
  };

  const titleChangeHandle = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setNewTitle(e.target.value);
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
              label={initTitle}
              autoFocus={true}
              size="small"
              onChange={(e) => titleChangeHandle(e)}
            />
          </>
        ) : (
          <>
            <div className="columnList_item__title" onClick={titleClickHandler}>
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
