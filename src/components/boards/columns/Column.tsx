import { Grid, Paper, TextField } from '@mui/material';
import './Columns.scss';
import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { columnSlice } from '../../../store/reducers/columnSlice';
import { ColumnData, ColumnType, TaskData } from '../../../services/interfaces';
import { deleteColumn, putColumn } from '../../../services/columnService';
import ConfirmationModal from '../../ConfirmationModal';
import { CreateAndUpdateTask } from '../tasks/CreateAndUpdateTask';
import { Task } from '../tasks/Tasks';
import { deleteTask, getTasksInColumn, postTask } from '../../../services/taskService';
import { UnpackNestedValue } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { getUsers } from '../../../services/authorizationService';
import { authSlice } from '../../../store/reducers/authenticationSlice';

interface ColumnProps {
  column: ColumnData;
}

export function Column(props: ColumnProps) {
  const { changeColumn, removeColumn } = columnSlice.actions;
  const [isEdit, setIsEdit] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const { allColumns, status } = useAppSelector((state) => state.columnReducer);
  const { userId } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector(
    (state) => state.columnReducer.allColumns.filter((column) => column.id === props.column.id)[0]
  );
  const { addTask } = columnSlice.actions;
  const params = useParams();
  const boardId: string = params.boardId as string;
  const { setUsers } = authSlice.actions;

  useEffect(() => {
    dispatch(
      getTasksInColumn({
        boardId: boardId,
        columnId: props.column.id,
      })
    );
    const showUsers = async () => {
      dispatch(setUsers(await getUsers()));
    };
    showUsers();
  }, [dispatch, boardId, props.column.id, setUsers]);

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
      boardId,
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
  }

  const createTask = async (data: UnpackNestedValue<ColumnType> | false) => {
    if (!data) return;

    const newTask = await postTask({
      body: {
        title: data.title,
        description: data.description,
        userId: userId,
      },
      boardId: boardId,
      columnId: props.column.id,
    });
    dispatch(addTask(newTask));
  };

  //  d-n-d
  const { draggableTask, columnOfDraggableTask } = useAppSelector((state) => state.boardReducer);

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // добавить стиль при перетаскивании
  };

  const dropHandler = async (e: React.DragEvent<HTMLDivElement>, column: ColumnData) => {
    e.preventDefault();
    console.log(e.target);
    await postTask({
      body: {
        title: (draggableTask as TaskData).title,
        description: (draggableTask as TaskData).description,
        userId: (draggableTask as TaskData).userId,
      },
      boardId: boardId,
      columnId: column.id,
    });
    await deleteTask({
      boardId: boardId,
      columnId: columnOfDraggableTask,
      taskId: (draggableTask as TaskData).id,
    });

    dispatch(getTasksInColumn({ boardId: boardId, columnId: columnOfDraggableTask }));
    dispatch(getTasksInColumn({ boardId: boardId, columnId: column.id }));
  };

  return (
    <Grid
      item
      className="column"
      onDragOver={(e) => dragOverHandler(e)}
      onDrop={(e) => dropHandler(e, props.column)}
    >
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
              sx={{ width: '160px' }}
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
              confirmedAction={() => deleteClickHandler(boardId, props.column.id)}
            />
          </>
        )}
      </div>
      <Paper className="column__body">
        <CreateAndUpdateTask
          columnId={props.column.id}
          textAction="Create"
          action={(data) => createTask(data)}
        />
        <div className="task_wrapper">
          {status === 'resolved' &&
            tasks &&
            tasks.map((task) => <Task key={task.id} task={task} columnId={props.column.id} />)}
        </div>
      </Paper>
    </Grid>
  );
}
