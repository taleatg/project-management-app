import * as React from 'react';
import { Box, Button, Typography, Modal, TextField, CircularProgress } from '@mui/material';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { columnAction } from '../../../services/columnService';
import { columnSlice } from '../../../store/reducers/columnSlice';
import { BackendResponse } from '../../authorization form/BackendResponse';

interface ColumnType {
  title: string;
  order: number;
  description: string;
  userId: string;
}

export function CreateTask(props: { button: JSX.Element; columnId: string }) {
  const { id } = useAppSelector((state) => state.boardReducer.currentBoard);
  const { userId } = useAppSelector((state) => state.authReducer);
  const { status } = useAppSelector((state) => state.columnReducer);
  const [open, setOpen] = React.useState(false);
  const { handleSubmit, control, reset } = useForm<ColumnType>();
  const { addTask } = columnSlice.actions;
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<ColumnType> = async (data) => {
    setOpen(false);
    const tasks = await columnAction({
      body: {},
      method: 'GET',
      path: `/boards/${id}/columns/${props.columnId}/tasks`,
    });

    const newTask = await columnAction({
      body: { title: data.title, order: tasks.length + 1, description: data.description, userId },
      boardId: id,
      method: 'POST',
      path: `/boards/${id}/columns/${props.columnId}/tasks`,
    });

    dispatch(addTask(newTask));
    reset();
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const getTaskData = (type: 'title' | 'description', text: string) => {
    return (
      <div className="title-wrap">
        <Typography variant="h6" component="div" gutterBottom noWrap>
          {text}
        </Typography>
        <Controller
          control={control}
          name={type}
          defaultValue=""
          rules={{
            required: `Enter ${type}`,
          }}
          render={({ field }) => (
            <TextField
              label={type}
              className="auth-input"
              fullWidth
              onChange={(e) => field.onChange(e)}
              value={field.value}
            />
          )}
        />
      </div>
    );
  };

  return (
    <>
      <div>
        {status === 'resolved' && (
          <>
            <Button size="small" fullWidth sx={{ textTransform: 'none' }} onClick={handleOpen}>
              {props.button}
            </Button>
            <Modal
              open={open}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box className="modal-wrapper">
                  <Typography id="modal-modal-title" variant="h5" component="h5" align="center">
                    Add Task
                  </Typography>
                  {getTaskData('title', 'Enter the task title:')}
                  {getTaskData('description', 'Enter the task description:')}
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
          </>
        )}
      </div>
      {status === 'rejected' && (
        <BackendResponse backendErrors="Error! Something went wrong :(" type="error" />
      )}
      {status === 'pending' && <CircularProgress />}
    </>
  );
}
