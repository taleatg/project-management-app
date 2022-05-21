import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { TaskData, UserData } from '../../../services/interfaces';
import { editTask } from '../../../services/taskService';
import { useParams } from 'react-router-dom';
import { columnSlice } from '../../../store/reducers/columnSlice';

const ITEM_HEIGHT = 25;

interface TaskManagerProps {
  currentResponsible: string;
  task: TaskData;
  columnId: string;
}

export default function UserAssignment(props: TaskManagerProps) {
  const dispatch = useAppDispatch();
  const { changedTask } = columnSlice.actions;
  const { users } = useAppSelector((state) => state.authReducer);
  const params = useParams();
  const boardId: string = params.boardId as string;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const selectResponsible = async (user: UserData) => {
    const newTaskManager = await editTask({
      body: {
        title: props.task.title,
        order: props.task.order,
        description: props.task.description,
        userId: user.id,
        boardId: boardId,
        columnId: props.columnId,
      },
      boardId: boardId,
      columnId: props.columnId,
      taskId: props.task.id,
    });

    dispatch(changedTask(newTaskManager));
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <PersonIcon sx={{ fontSize: '16px', textTransform: 'none' }} />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {users.map((user) => (
          <MenuItem
            key={user.id}
            onClick={() => {
              handleClose();
              selectResponsible(user);
            }}
            selected={user.name === props.currentResponsible}
            sx={{ fontSize: '14px' }}
          >
            {user.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
