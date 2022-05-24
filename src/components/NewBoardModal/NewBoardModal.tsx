import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import './NewBoardModal.scss';
import { FormHelperText, IconButton, TextField } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { postBoard } from '../../services/boardService';
import { useAppDispatch } from '../../store/store';
import { useTranslation } from 'react-i18next';

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
  p: 3,
};

export interface FormValues {
  'Board title': string;
  'Board description': string;
}

interface NewBoardModalProps {
  place: 'menu' | 'burger-menu';
}

export default function NewBoardModal(props: NewBoardModalProps) {
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const title = data['Board title'];
    const description = data['Board description'];
    await dispatch(postBoard({ title: title, description: description }));
    reset();
    handleClose();
  };

  return (
    <div>
      {props.place === 'menu' ? (
        <Button onClick={handleOpen}>
          <span className="link link__menu">{t('board.new_board')}</span>
        </Button>
      ) : (
        <Typography textAlign="center" onClick={handleOpen}>
          {t('board.new_board')}
        </Typography>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="new-board__modal">
          <Typography id="modal-modal-title" variant="h6" component="p">
            {t('board.new_board')}
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
          <form>
            <Controller
              control={control}
              name="Board title"
              defaultValue=""
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <>
                  <TextField
                    label={t('board.board_title')}
                    sx={{ marginTop: '20px' }}
                    margin="normal"
                    fullWidth
                    multiline
                    variant="outlined"
                    onChange={(e) => field.onChange(e)}
                    value={field.value}
                  />
                  <FormHelperText error sx={{ height: '10px' }}>
                    {errors['Board title'] && t('errors.board_title_is_required')}
                  </FormHelperText>
                </>
              )}
            />
            <Controller
              control={control}
              name="Board description"
              defaultValue=""
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <>
                  <TextField
                    label={t('board.board_description')}
                    sx={{ marginTop: '20px' }}
                    margin="normal"
                    fullWidth
                    multiline
                    variant="outlined"
                    onChange={(e) => field.onChange(e)}
                    value={field.value}
                  />
                  <FormHelperText error sx={{ height: '10px' }}>
                    {errors['Board description'] && t('errors.board_description_is_required')}
                  </FormHelperText>
                </>
              )}
            />
            <Button
              type="submit"
              variant="contained"
              onClick={handleSubmit(onSubmit)}
              sx={{
                mt: '20px',
                left: '50%',
                transform: 'translate(-50%, 0)',
                background: '#484bee',
              }}
            >
              {t('button.create')}
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
