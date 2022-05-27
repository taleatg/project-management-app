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
import { boardSlice } from '../../../store/reducers/boardSlice';

interface ColumnProps {
  column: ColumnData;
}

export function Column(props: ColumnProps) {
  const { changeColumn, removeColumn, replaceColumns, removeTask, changeTaskOrder, changeTaskId } =
    columnSlice.actions;
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
    const title = newTitle ? newTitle : initTitle;
    const updatedColumn = await putColumn(
      {
        title: title,
        order: currentColumn.order,
      },
      boardId,
      currentColumn.id
    );
    await dispatch(changeColumn(updatedColumn));
    setIsEdit(false);
  };

  const enterClickHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code === 'Enter') {
      confirmClickHandler();
    }
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

  const { setDraggableTask, setDraggableColumn } = boardSlice.actions;
  const { draggableTask, draggableColumn, columnOfDraggableTask } = useAppSelector(
    (state) => state.boardReducer
  );

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>, column: ColumnData) => {
    dispatch(setDraggableColumn(column));
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dropHandler = async (e: React.DragEvent<HTMLDivElement>, column: ColumnData) => {
    e.preventDefault();
    if (draggableTask) {
      dispatch(
        removeTask({
          columnId: (draggableTask as TaskData).columnId,
          taskId: (draggableTask as TaskData).id,
        })
      );
      dispatch(
        addTask({
          data: {
            id: (draggableTask as TaskData).id,
            title: (draggableTask as TaskData).title,
            order: (draggableTask as TaskData).order,
            description: (draggableTask as TaskData).description,
            userId: (draggableTask as TaskData).userId,
            columnId: column.id,
          },
          boardId: boardId,
          columnId: column.id,
        })
      );
      dispatch(changeTaskOrder(column.id));
      const { data: createdTask } = await postTask({
        body: {
          title: (draggableTask as TaskData).title,
          description: (draggableTask as TaskData).description,
          userId: (draggableTask as TaskData).userId,
        },
        boardId: boardId,
        columnId: column.id,
      });
      dispatch(
        changeTaskId({
          columnId: column.id,
          oldId: (draggableTask as TaskData).id,
          newId: createdTask.id,
        })
      );
      await deleteTask({
        boardId: boardId,
        columnId: columnOfDraggableTask,
        taskId: (draggableTask as TaskData).id,
      });
      dispatch(setDraggableTask(null));
    } else {
      dispatch(replaceColumns([draggableColumn as ColumnData, column as ColumnData]));
      dispatch(
        changeColumn({
          id: (draggableColumn as ColumnData).id,
          title: (draggableColumn as ColumnData).title,
          order: column.order,
          tasks: (draggableColumn as ColumnData).tasks,
        })
      );
      dispatch(
        changeColumn({
          id: (column as ColumnData).id,
          title: (column as ColumnData).title,
          order: (draggableColumn as ColumnData).order,
          tasks: (column as ColumnData).tasks,
        })
      );
      await putColumn(
        {
          title: (draggableColumn as ColumnData).title,
          order: column.order,
        },
        boardId,
        (draggableColumn as ColumnData).id
      );
      await putColumn(
        {
          title: (column as ColumnData).title,
          order: (draggableColumn as ColumnData).order,
        },
        boardId,
        (column as ColumnData).id
      );
    }
  };

  return (
    <Grid
      item
      className="column"
      onDragStart={(e: React.DragEvent<HTMLDivElement>) => dragStartHandler(e, props.column)}
      onDragOver={(e) => dragOverHandler(e)}
      onDrop={(e) => dropHandler(e, props.column)}
      draggable={true}
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
              onKeyPress={(e) => enterClickHandler(e)}
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
