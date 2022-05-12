import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

interface ConfirmModalProps {
  textButton?: string;
  confirmedAction: () => void;
}

export default function ConfirmationModal(props: ConfirmModalProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    props.confirmedAction();
    setOpen(false);
  };

  return (
    <div>
      {props.textButton ? (
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleClickOpen}
        >
          {props.textButton}
        </Button>
      ) : (
        <IconButton aria-label="delete" onClick={handleClickOpen}>
          <DeleteIcon color="primary" />
        </IconButton>
      )}
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Are you sure?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to {props.textButton ? props.textButton.toLowerCase() : 'detele it'}?
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
