import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAppSelector } from '../store/store';

interface ConfirmModalProps {
  textButton: string;
  id: string;
  confirmedAction: (id: string, token: string) => Promise<void> | void;
}

export default function ConfirmationModal(props: ConfirmModalProps) {
  const [open, setOpen] = React.useState(false);
  const { token } = useAppSelector((state) => state.authReducer);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    props.confirmedAction(props.id, token);
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} color={'warning'}>
        {props.textButton}
      </Button>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Are you sure?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to {props.textButton.toLowerCase()}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color={'error'}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} autoFocus color={'success'}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
