import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import { useAppSelector } from '../../../store/store';

const ITEM_HEIGHT = 25;

export default function UserAssignment(props: { currentResponsible: string }) {
  const { users } = useAppSelector((state) => state.authReducer);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
            onClick={handleClose}
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
