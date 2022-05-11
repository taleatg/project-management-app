import * as React from 'react';
import { Box, Button, Typography, Modal, TextField } from '@mui/material';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { columnAction } from '../../../services/columnService';
import './Columns.scss';
import { columnSlice } from '../../../store/reducers/columnSlice';

interface ColumnType {
  title: string;
  order: number;
}

export function CreateColumn(props: { button: JSX.Element }) {
  const { id } = useAppSelector((state) => state.boardReducer.currentBoard);
  const { token } = useAppSelector((state) => state.authReducer);
  const [open, setOpen] = React.useState(false);
  const { handleSubmit, control, reset } = useForm<ColumnType>();
  const { addItem } = columnSlice.actions;
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<ColumnType> = async (data) => {
    setOpen(false);
    const columns = await columnAction({ boardId: id, token: token, method: 'GET' });

    const currentColumn = await columnAction({
      body: { title: data.title, order: columns.length + 1 },
      boardId: id,
      token: token,
      method: 'POST',
    });

    dispatch(addItem(currentColumn));
    reset();
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>{props.button}</Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className="modal-wrapper">
            <Typography id="modal-modal-title" variant="h5" component="h5" align="center">
              Add column
            </Typography>
            <div className="title-wrap">
              <Typography variant="h6" component="div" gutterBottom noWrap>
                Enter the column title:
              </Typography>
              <Controller
                control={control}
                name="title"
                defaultValue=""
                rules={{
                  required: 'Enter title',
                }}
                render={({ field }) => (
                  <TextField
                    label="title"
                    className="auth-input"
                    fullWidth
                    onChange={(e) => field.onChange(e)}
                    value={field.value}
                  />
                )}
              />
            </div>
            <div className="button-container">
              <Button type="submit" variant="contained">
                Add
              </Button>
              <Button variant="outlined" onClick={handleClose}>
                Close
              </Button>
            </div>
          </Box>
        </form>
      </Modal>
    </div>
  );
}
