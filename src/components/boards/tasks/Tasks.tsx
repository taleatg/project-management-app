import React from 'react';
import './Tasks.scss';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { deleteTask, editTask, getTasksInColumn } from '../../../services/taskService';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { ColumnType, TaskData } from '../../../services/interfaces';
import { columnSlice } from '../../../store/reducers/columnSlice';
import { Card, Divider, Menu } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import ConfirmationModal from '../../ConfirmationModal';
import { CreateTask } from './CreateTask';
import { UnpackNestedValue } from 'react-hook-form';

interface TaskProps {
  task: TaskData;
  columnId: string;
}

export function Task(props: TaskProps) {
  const dispatch = useAppDispatch();
  const { currentBoard } = useAppSelector((state) => state.boardReducer);
  const { allColumns } = useAppSelector((state) => state.columnReducer);
  const { removeTask, changedTask } = columnSlice.actions;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const deleteSelectedTask = async () => {
    const data = await deleteTask({
      boardId: currentBoard.id,
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

  const markTheTaskAsCompleted = async () => {
    handleClose();
  };

  const updateTask = async (data: UnpackNestedValue<ColumnType>) => {
    handleClose();
    const body = {
      title: data.title,
      order: props.task.order,
      description: data.description,
      userId: props.task.userId,
      boardId: currentBoard.id,
      columnId: props.columnId,
    };
    await editTask({
      body,
      boardId: currentBoard.id,
      columnId: props.columnId,
      taskId: props.task.id,
    });
    dispatch(getTasksInColumn({ boardId: currentBoard.id, columnId: props.columnId }));
  };

  const updateTasksOrder = (tasks: TaskData[]) => {
    tasks.map(async (task) => {
      const updateTask = await editTask({
        body: {
          title: task.title,
          order: task.order - 1,
          description: task.description,
          userId: task.userId,
          boardId: currentBoard.id,
          columnId: props.columnId,
        },
        boardId: currentBoard.id,
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
              <MenuItem sx={{ justifyContent: 'center' }}>
                <CheckCircleOutlineIcon color="disabled" onClick={markTheTaskAsCompleted} />
              </MenuItem>
              <MenuItem sx={{ justifyContent: 'center' }}>
                <CreateTask
                  task={props.task}
                  columnId={props.columnId}
                  button={<BorderColorIcon />}
                  action={(data) => updateTask(data)}
                  textAction="Update"
                />
              </MenuItem>
              <MenuItem>
                <ConfirmationModal confirmedAction={() => deleteSelectedTask()} />
              </MenuItem>
            </Menu>
          </div>
        </div>
        <Divider />
        <Typography className="description" component="p">
          {props.task.description}
        </Typography>
      </Card>
    </div>
  );
}
