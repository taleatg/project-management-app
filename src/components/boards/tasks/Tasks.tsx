import React, { useEffect, useState } from 'react';
import { Card, Divider, Typography, Button, Menu, MenuItem } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import './Tasks.scss';
import { deleteTask, updateTask } from '../../../services/taskService';
import ConfirmationModal from '../../ConfirmationModal';
import { getTasksInColumn } from '../../../services/taskService';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { TaskData } from '../../../services/interfaces';
import { columnSlice } from '../../../store/reducers/columnSlice';

export function Tasks(props: { columnId: string }) {
  const dispatch = useAppDispatch();
  const { getAllTasks } = columnSlice.actions;
  const { token } = useAppSelector((state) => state.authReducer);
  const { currentBoard } = useAppSelector((state) => state.boardReducer);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [allTasks, setAllTasks] = useState<TaskData[]>([]);
  const [currentTask, setCurrentTask] = useState<TaskData>({
    id: '',
    title: '',
    order: 1,
    done: false,
    description: '',
    userId: '',
    files: [
      {
        filename: '',
        fileSize: 0,
      },
    ],
  });

  useEffect(() => {
    const getTasks = async () => {
      const tasks = await getTasksInColumn({ boardId: currentBoard.id, columnId: props.columnId });
      setAllTasks(tasks);
      return dispatch(getAllTasks(tasks));
    };
    getTasks();
  }, [dispatch, token, currentBoard.id, props.columnId, getAllTasks]);

  const deleteSelectedTask = async () => {
    await deleteTask({
      boardId: currentBoard.id,
      columnId: props.columnId,
      taskId: currentTask?.id ?? '',
    });
    const tasks = await getTasksInColumn({ boardId: currentBoard.id, columnId: props.columnId });
    setAllTasks(tasks);
    handleClose();
    updateTasksOrder(tasks);
  };

  const updateTasksOrder = (tasks: TaskData[]) => {
    const changedTasks = tasks.filter((task) => task.order > currentTask.order);

    changedTasks.map(async (task) => {
      await updateTask({
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
    });
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {allTasks.length
        ? allTasks.map((task) => {
            return (
              <div className="task" key={task.id}>
                <>
                  <Card key={task.id} className="card">
                    <div className="title-task">
                      <Typography variant="h5" component="div">
                        {task.title}
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
                          <MoreHorizIcon onClick={() => setCurrentTask(task)} />
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
                          <MenuItem>
                            <CheckCircleOutlineIcon
                              color="disabled"
                              sx={{ justifyContent: 'center' }}
                              onClick={handleClose}
                            />
                          </MenuItem>
                          <MenuItem>
                            <BorderColorIcon
                              sx={{ justifyContent: 'center' }}
                              onClick={handleClose}
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
                      {task.description}
                    </Typography>
                  </Card>
                </>
              </div>
            );
          })
        : null}
    </>
  );
}
