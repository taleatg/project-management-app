import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './NewBoardModal.scss';
import { TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { postBoard } from '../services/boardService';
import { useAppDispatch, useAppSelector } from '../store/store';

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

export interface FormValues {
  'Board title': string;
}

export default function NewBoardModal() {
  const { token } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { register, reset, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const title = data['Board title'];
    await dispatch(postBoard({ title, token }));
    reset();
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen}>
        <span className="new-board__button">New board</span>
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="new-board__modal">
          <Typography id="modal-modal-title" variant="h6" component="p">
            Create new board
          </Typography>
          <form>
            <TextField {...register('Board title')} fullWidth />
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
