import React, { useEffect, useState } from 'react';
import { Card, Divider, Typography, Button, Menu, MenuItem } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import './Tasks.scss';
// import { deleteTask } from '../../../services/taskService';
// import ConfirmationModal from '../../ConfirmationModal';
import { getTasksInColumn } from '../../../services/taskService';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { TaskData } from '../../../services/interfaces';
import { columnSlice } from '../../../store/reducers/columnSlice';

export function Tasks(props: { columnId: string }) {
  const dispatch = useAppDispatch();
  const { getAllTasks } = columnSlice.actions;
  const { token } = useAppSelector((state) => state.authReducer);
  // const { deleteTaskFromState, getAllTasks } = columnSlice.actions;
  const { currentBoard } = useAppSelector((state) => state.boardReducer);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [allTasks, setAllTasks] = useState<TaskData[]>([
    {
      // id: '',
      // title: '',
      // order: 0,
      // tasks: [
      //   {
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
      //   },
      // ],
    },
  ]);

  useEffect(() => {
    const getTasks = async () => {
      const tasks = await getTasksInColumn({ boardId: currentBoard.id, columnId: props.columnId });
      setAllTasks(tasks);
      return dispatch(getAllTasks(tasks));
    };
    getTasks();
  }, [dispatch, token, currentBoard.id, props.columnId, getAllTasks]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteSelectedTask = async () => {
    // await deleteTask({ boardId: props.bordId, columnId: props.column.id, taskId: props.task.id });
    // dispatch(deleteTaskFromState(props.task.id));
    handleClose();
  };

  return (
    <>
      {allTasks.length && allTasks[0].id
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
                          <MenuItem>
                            <CheckCircleOutlineIcon color="disabled" onClick={handleClose} />
                          </MenuItem>
                          <MenuItem>
                            <BorderColorIcon onClick={handleClose} />
                          </MenuItem>
                          <MenuItem>
                            {/*<ConfirmationModal*/}
                            {/*  textButton="delete task"*/}
                            {/*  confirmedAction={deleteSelectedTask}*/}
                            {/*>/*/}
                            <DeleteIcon
                              sx={{ color: 'red' }}
                              onClick={deleteSelectedTask}
                              id={task.id}
                            />
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
