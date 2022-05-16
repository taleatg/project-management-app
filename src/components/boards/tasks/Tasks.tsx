import React, { useState } from 'react';
import './Tasks.scss';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { deleteTask, editTask, getTasksInColumn } from '../../../services/taskService';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { ColumnType, TaskData } from '../../../services/interfaces';
import { columnSlice } from '../../../store/reducers/columnSlice';
import { Card, Divider, Menu } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import ConfirmationModal from '../../ConfirmationModal';
import { CreateAndUpdateTask } from './CreateAndUpdateTask';
import { UnpackNestedValue } from 'react-hook-form';
import { getUserName } from '../../../services/authorizationService';
import { useParams } from 'react-router-dom';

interface TaskProps {
  task: TaskData;
  columnId: string;
}

export function Task(props: TaskProps) {
  const dispatch = useAppDispatch();
  const { allColumns } = useAppSelector((state) => state.columnReducer);
  const { removeTask, changedTask } = columnSlice.actions;
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
    handleClose();

    const changedTasks = allColumns
      .filter((column) => column.id === props.columnId)[0]
      .tasks.filter((task) => task.order > props.task.order);
    updateTasksOrder(changedTasks);
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

  const updateTasksOrder = (tasks: TaskData[]) => {
    tasks.map(async (task) => {
      const updateTask = await editTask({
        body: {
          title: task.title,
          order: task.order - 1,
          description: task.description,
          userId: task.userId,
          boardId: boardId,
          columnId: props.columnId,
        },
        boardId: boardId,
        columnId: props.columnId,
        taskId: task.id,
      });

      dispatch(changedTask(updateTask));
    });
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getName = async () => {
    const name = await getUserName(props.task.userId);
    setUserName(name.name);
    return name;
  };
  getName();

  return (
    <div className="task">
      <Card key={props.task.id} className="card">
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
          <PersonIcon sx={{ fontSize: '16px', mr: '5px' }} />
          <Typography component="p">{userName}</Typography>
        </div>
      </Card>
    </div>
  );
}
