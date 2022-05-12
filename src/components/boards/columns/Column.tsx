import { Grid, Paper, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import './Columns.scss';
import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { columnSlice } from '../../../store/reducers/columnSlice';
import { ColumnData } from '../../../services/interfaces';
import { deleteColumn, putColumn } from '../../../services/columnService';
import ConfirmationModal from '../../ConfirmationModal';

const styleTextField = {
  width: '160px',
};

export function Column(props: { id: string }) {
  const { changeColumn, removeColumn } = columnSlice.actions;
  const [isEdit, setIsEdit] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const { allColumns } = useAppSelector((state) => state.columnReducer);
  const { currentBoard } = useAppSelector((state) => state.boardReducer);
  const dispatch = useAppDispatch();

  const initTitle = (allColumns.find((column) => column.id === props.id) as ColumnData).title;
  const currentColumn = allColumns.find((column) => column.id === props.id) as ColumnData;

  const titleClickHandler = () => {
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

  async function deleteClickHandler(boardId: string, columnId: string) {
    await deleteColumn(boardId, columnId);
    dispatch(removeColumn(columnId));

    const changedColumns = allColumns.filter(
      (column) => column.order > currentColumn.order
    ) as ColumnData[];
    for (let i = 0; i < changedColumns.length; i++) {
      const updatedColumn = await putColumn(
        {
          title: changedColumns[i].title,
          order: changedColumns[i].order - 1,
        },
        currentBoard.id,
        changedColumns[i].id
      );
      await dispatch(changeColumn(updatedColumn));
    }
  }

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
            <ConfirmationModal
              textButton={''}
              confirmedAction={() => deleteClickHandler(currentBoard.id, props.id)}
            />
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
