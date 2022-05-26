import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface ConfirmModalProps {
  textButton?: string;
  unconfirmedAction?: () => void;
  confirmedAction: () => void;
}

export default function ConfirmationModal(props: ConfirmModalProps) {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    if (props.unconfirmedAction) {
      props.unconfirmedAction();
    }
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
          className="button"
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleClickOpen}
        >
          {props.textButton}
        </Button>
      ) : (
        <IconButton aria-label="delete" onClick={handleClickOpen}>
          <DeleteIcon />
        </IconButton>
      )}
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{t('confirmation_modal.ask_sure')}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t('confirmation_modal.ask_title')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color={'error'}>
            {t('button.cancel')}
          </Button>
          <Button onClick={handleConfirm} autoFocus color={'success'}>
            {t('button.confirm')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
