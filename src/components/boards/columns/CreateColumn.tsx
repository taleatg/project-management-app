import * as React from 'react';
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  IconButton,
  FormHelperText,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import './Columns.scss';
import { columnSlice } from '../../../store/reducers/columnSlice';
import { postColumn } from '../../../services/columnService';
import { useTranslation } from 'react-i18next';

interface ColumnType {
  title: string;
  order: number;
}

export function CreateColumn(props: { button: JSX.Element }) {
  const { id } = useAppSelector((state) => state.boardReducer.currentBoard);
  const [open, setOpen] = React.useState(false);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ColumnType>();
  const { addColumn } = columnSlice.actions;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const onSubmit: SubmitHandler<ColumnType> = async (data) => {
    setOpen(false);
    const title = data.title;
    const newColumn = await postColumn(title, id);
    dispatch(addColumn(newColumn));
    reset();
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  return (
    <div>
      <Button onClick={handleOpen}>{props.button}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-wrapper" sx={{ boxShadow: 24, p: 3 }}>
          <Typography id="modal-modal-title" variant="h6" component="p">
            {t('board.new_column')}
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
              name="title"
              defaultValue=""
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <>
                  <TextField
                    label={t('board.column_title')}
                    sx={{ marginTop: '20px' }}
                    margin="normal"
                    fullWidth
                    multiline
                    variant="outlined"
                    onChange={(e) => field.onChange(e)}
                    value={field.value}
                  />
                  <FormHelperText error sx={{ height: '10px' }}>
                    {errors.title && t('errors.column_title_is_required')}
                  </FormHelperText>
                </>
              )}
            />
            <Button
              type="submit"
              variant="contained"
              onClick={handleSubmit(onSubmit)}
              sx={{ mt: '20px', left: '50%', transform: 'translate(-50%, 0)' }}
            >
              {t('button.create')}
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
