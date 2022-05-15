import { Grid, Paper, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import './Columns.scss';
import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { columnSlice } from '../../../store/reducers/columnSlice';
import { ColumnData, ColumnType } from '../../../services/interfaces';
import { deleteColumn, putColumn } from '../../../services/columnService';
import ConfirmationModal from '../../ConfirmationModal';
import { CreateAndUpdateTask } from '../tasks/CreateAndUpdateTask';
import { Task } from '../tasks/Tasks';
import { getTasksInColumn, postTask } from '../../../services/taskService';
import { UnpackNestedValue } from 'react-hook-form';

const styleTextField = {
  width: '160px',
};

interface ColumnProps {
  column: ColumnData;
}

export function Column(props: ColumnProps) {
  const { changeColumn, removeColumn } = columnSlice.actions;
  const [isEdit, setIsEdit] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const { allColumns, status } = useAppSelector((state) => state.columnReducer);
  const { currentBoard } = useAppSelector((state) => state.boardReducer);
  const { token, userId } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector(
    (state) => state.columnReducer.allColumns.filter((column) => column.id === props.column.id)[0]
  );
  const { addTask } = columnSlice.actions;

  useEffect(() => {
    dispatch(
      getTasksInColumn({
        boardId: currentBoard.id,
        columnId: props.column.id,
      })
    );
  }, [dispatch, token, currentBoard.id, props.column.id]);

  const currentColumn = allColumns.find((column) => column.id === props.column.id) as ColumnData;
  const initTitle = currentColumn.title;

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

  const createTask = async (data: UnpackNestedValue<ColumnType> | false) => {
    if (!data) return;

    const newTask = await postTask({
      body: {
        title: data.title,
        order: tasks.length ? tasks.length + 1 : 1,
        description: data.description,
        userId: userId,
      },
      boardId: currentBoard.id,
      columnId: props.column.id,
    });
    dispatch(addTask(newTask));
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
            <ConfirmationModal
              textButton={''}
              confirmedAction={() => deleteClickHandler(currentBoard.id, props.column.id)}
            />
          </>
        )}
      </div>
      <Paper className="column__body">
        <CreateAndUpdateTask
          columnId={props.column.id}
          textAction="Add"
          action={(data) => createTask(data)}
          button={
            <>
              <AddIcon fontSize="small" /> Add task
            </>
          }
        />
        <div>
          {status === 'resolved' &&
            tasks &&
            tasks.map((task) => <Task key={task.id} task={task} columnId={props.column.id} />)}
        </div>
      </Paper>
    </Grid>
  );
}
