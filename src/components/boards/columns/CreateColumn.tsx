import * as React from 'react';
import { Box, Button, Typography, Modal, TextField, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import './Columns.scss';
import { columnSlice } from '../../../store/reducers/columnSlice';
import { postColumn } from '../../../services/columnService';

interface ColumnType {
  title: string;
  order: number;
}

export function CreateColumn(props: { button: JSX.Element }) {
  const { id } = useAppSelector((state) => state.boardReducer.currentBoard);
  const { allColumns } = useAppSelector((state) => state.columnReducer);
  const [open, setOpen] = React.useState(false);
  const { handleSubmit, register, reset } = useForm<ColumnType>();
  const { addColumn } = columnSlice.actions;
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<ColumnType> = async (data) => {
    setOpen(false);
    const title = data.title;
    const order = allColumns.length + 1;
    const newColumn = await postColumn({ title: title, order: order }, id);
    dispatch(addColumn(newColumn));
    reset();
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>{props.button}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-wrapper" sx={{ boxShadow: 24 }}>
          <div className="new-column__title">
            <Typography id="modal-modal-title" variant="h6" component="p">
              New column
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
              {...register('title', { required: true })}
              fullWidth
              margin="normal"
              sx={{ marginTop: '30px' }}
              label="Column title"
              variant="outlined"
            />
            <Button
              type="submit"
              variant="contained"
              onClick={handleSubmit(onSubmit)}
              sx={{ marginTop: '20px' }}
            >
              Create
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
