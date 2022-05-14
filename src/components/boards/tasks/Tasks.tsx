import React from 'react';
import './Tasks.scss';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { deleteTask } from '../../../services/taskService';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { TaskData } from '../../../services/interfaces';
import { columnSlice } from '../../../store/reducers/columnSlice';
import { Card, Divider, Menu } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import ConfirmationModal from '../../ConfirmationModal';

interface TaskProps {
  task: TaskData;
  columnId: string;
}

export function Task(props: TaskProps) {
  const dispatch = useAppDispatch();
  const { currentBoard } = useAppSelector((state) => state.boardReducer);
  const { removeTask } = columnSlice.actions;

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
                <CheckCircleOutlineIcon color="disabled" onClick={handleClose} />
              </MenuItem>
              <MenuItem sx={{ justifyContent: 'center' }}>
                <BorderColorIcon onClick={handleClose} />
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
