import React, { useState } from 'react';
import './Tasks.scss';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { deleteTask, editTask, getTasksInColumn, postTask } from '../../../services/taskService';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { ColumnType, TaskData } from '../../../services/interfaces';
import { columnSlice } from '../../../store/reducers/columnSlice';
import { Card, Divider, Menu } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import ConfirmationModal from '../../ConfirmationModal';
import { CreateAndUpdateTask } from './CreateAndUpdateTask';
import { UnpackNestedValue } from 'react-hook-form';
import { getUserName } from '../../../services/authorizationService';
import { useParams } from 'react-router-dom';
import UserAssignment from './UserAssignment';
import { boardSlice } from '../../../store/reducers/boardSlice';

interface TaskProps {
  task: TaskData;
  columnId: string;
}

export function Task(props: TaskProps) {
  const dispatch = useAppDispatch();
  const { removeTask } = columnSlice.actions;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [isEdit, setIsEdit] = useState(false);
  const params = useParams();
  const boardId: string = params.boardId as string;
  const [userName, setUserName] = useState('');

  const deleteSelectedTask = async () => {
    const data = await deleteTask({
      boardId: boardId,
      columnId: props.columnId,
      taskId: props.task.id,
    });
    dispatch(removeTask(data));
    dispatch(
      getTasksInColumn({
        boardId: boardId,
        columnId: props.columnId,
      })
    );
    handleClose();
  };

  const updateTask = async (data: UnpackNestedValue<ColumnType> | false) => {
    handleClose();
    setIsEdit(false);
    if (!data) return;

    const body = {
      title: data.title,
      order: props.task.order,
      description: data.description,
      userId: props.task.userId,
      boardId: boardId,
      columnId: props.columnId,
    };
    await editTask({
      body,
      boardId: boardId,
      columnId: props.columnId,
      taskId: props.task.id,
    });
    dispatch(getTasksInColumn({ boardId: boardId, columnId: props.columnId }));
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getName = async () => {
    if (props.task?.userId) {
      const name = await getUserName(props.task.userId);
      setUserName(name.name);
      return name;
    }
  };
  if (!userName) {
    getName();
  }

  // d-n-d

  const { setDraggableTask } = boardSlice.actions;
  const { draggableTask, columnOfDraggableTask } = useAppSelector((state) => state.boardReducer);

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>, task: TaskData) => {
    dispatch(setDraggableTask(task));
  };

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {};

  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {};

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // добавить стиль при перетаскивании
  };

  const dropHandler = async (e: React.DragEvent<HTMLDivElement>, task: TaskData) => {
    e.preventDefault();
    e.stopPropagation();
    if (task.columnId === (draggableTask as TaskData).columnId) {
      {
        const body = {
          title: (draggableTask as TaskData).title,
          order: (task as TaskData).order,
          description: (draggableTask as TaskData).description,
          userId: props.task.userId,
          boardId: boardId,
          columnId: props.columnId,
        };
        await editTask({
          body,
          boardId: boardId,
          columnId: props.columnId,
          taskId: (draggableTask as TaskData).id,
        });
      }
      dispatch(getTasksInColumn({ boardId: boardId, columnId: props.columnId }));
    } else {
      const { data: createdTask } = await postTask({
        body: {
          title: (draggableTask as TaskData).title,
          description: (draggableTask as TaskData).description,
          userId: props.task.userId,
        },
        boardId: boardId,
        columnId: (task as TaskData).columnId,
      });
      await deleteTask({
        boardId: boardId,
        columnId: columnOfDraggableTask,
        taskId: (draggableTask as TaskData).id,
      });
      const body = {
        title: (draggableTask as TaskData).title,
        order: (task as TaskData).order,
        description: (draggableTask as TaskData).description,
        userId: props.task.userId,
        boardId: boardId,
        columnId: (task as TaskData).columnId,
      };
      await editTask({
        body,
        boardId: boardId,
        columnId: (task as TaskData).columnId,
        taskId: (createdTask as TaskData).id,
      });
      dispatch(getTasksInColumn({ boardId: boardId, columnId: columnOfDraggableTask }));
      dispatch(getTasksInColumn({ boardId: boardId, columnId: (task as TaskData).columnId }));
    }
  };

  return (
    <div className="task">
      <Card
        key={props.task.id}
        className="card"
        draggable={true}
        onDragStart={(e: React.DragEvent<HTMLDivElement>) => dragStartHandler(e, props.task)}
        onDragEnd={(e) => dragEndHandler(e)}
        onDragOver={(e) => dragOverHandler(e)}
        onDragLeave={(e) => dragLeaveHandler(e)}
        onDrop={(e) => dropHandler(e, props.task)}
      >
        <div className="title-task">
          <Typography variant="h5" component="div">
            {props.task.title}
          </Typography>
          <div>
            <Button
              className="show-more"
              sx={{ minWidth: '20px', minHeight: '20px' }}
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MoreHorizIcon />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem sx={{ justifyContent: 'center' }} onClick={() => setIsEdit(true)}>
                <BorderColorIcon />
              </MenuItem>
              <MenuItem>
                <ConfirmationModal
                  confirmedAction={() => deleteSelectedTask()}
                  unconfirmedAction={handleClose}
                />
              </MenuItem>
            </Menu>
          </div>
        </div>
        {isEdit ? (
          <CreateAndUpdateTask
            task={props.task}
            columnId={props.columnId}
            action={(data) => updateTask(data)}
            textAction="Update"
            open={true}
          />
        ) : null}
        <Divider />
        <Typography className="description" component="p">
          {props.task.description}
        </Typography>
        <div className="assign">
          <UserAssignment
            currentResponsible={userName}
            task={props.task}
            columnId={props.columnId}
          />
          <Typography sx={{ fontSize: '14px' }} component="p">
            {userName}
          </Typography>
        </div>
      </Card>
    </div>
  );
}
