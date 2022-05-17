import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import './NewBoardModal.scss';
import { IconButton, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { postBoard } from '../../services/boardService';
import { useAppDispatch } from '../../store/store';

const style = {
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '250px',
  bgcolor: 'background.paper',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
};

const style_submit = {
  marginTop: '20px',
};

const style_textfield = {
  marginTop: '30px',
};

export interface FormValues {
  'Board title': string;
}

interface NewBoardModalProps {
  place: 'menu' | 'burger-menu';
}

export default function NewBoardModal(props: NewBoardModalProps) {
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const title = data['Board title'];
    await dispatch(postBoard(title));
    reset();
    handleClose();
  };

  return (
    <div>
      {props.place === 'menu' ? (
        <Button onClick={handleOpen}>
          <span className="link link__menu">New board</span>
        </Button>
      ) : (
        <Typography textAlign="center" onClick={handleOpen}>
          New board
        </Typography>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="new-board__modal">
          <div className="new-board__title">
            <Typography id="modal-modal-title" variant="h6" component="p">
              Create new board
            </Typography>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <form>
            <TextField
              {...register('Board title', { required: true })}
              fullWidth
              margin="normal"
              sx={style_textfield}
            />
            <div className="new-board__error">
              {errors['Board title']?.type === 'required' ? 'Please enter board title' : ''}
            </div>
            <Button
              type="submit"
              variant="contained"
              onClick={handleSubmit(onSubmit)}
              sx={style_submit}
            >
              Create
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
