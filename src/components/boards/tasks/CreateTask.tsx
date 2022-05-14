import * as React from 'react';
import { Box, Button, Typography, Modal, TextField } from '@mui/material';
import { useForm, Controller, SubmitHandler, UnpackNestedValue } from 'react-hook-form';
import { ColumnType, TaskData } from '../../../services/interfaces';

interface EditTaskProps {
  task?: TaskData;
  action: (data: UnpackNestedValue<ColumnType>) => void;
  button?: JSX.Element;
  columnId: string;
  textAction: string;
}

export function CreateTask(props: EditTaskProps) {
  const [open, setOpen] = React.useState(false);
  const { handleSubmit, control, reset } = useForm<ColumnType>();

  const onSubmit: SubmitHandler<ColumnType> = async (data) => {
    setOpen(false);
    props.action(data);
    reset();
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const getTaskData = (
    type: 'title' | 'description',
    text: string,
    currentState = '',
    rows = 1
  ) => {
    return (
      <div className="title-wrap">
        <Typography variant="h6" component="div" gutterBottom noWrap>
          {text}
        </Typography>
        <Controller
          control={control}
          name={type}
          defaultValue={currentState}
          rules={{
            required: `Enter ${type}`,
          }}
          render={({ field }) => (
            <TextField
              label={type}
              className="auth-input"
              fullWidth
              multiline
              rows={rows}
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
      {props.textAction === 'Add' ? (
        <Button size="small" fullWidth sx={{ textTransform: 'none' }} onClick={handleOpen}>
          {props.button}
        </Button>
      ) : (
        <div onClick={handleOpen}>{props.button}</div>
      )}
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className="modal-wrapper">
            <Typography id="modal-modal-title" variant="h5" component="h5" align="center">
              {`${props.textAction} Task`}
            </Typography>
            {getTaskData('title', 'Enter the task title:', props.task?.title)}
            {getTaskData('description', 'Enter the task description:', props.task?.description, 3)}
            <div className="button-container">
              <Button type="submit" variant="contained">
                {props.textAction}
              </Button>
              <Button variant="outlined" onClick={handleClose}>
                Close
              </Button>
            </div>
          </Box>
        </form>
      </Modal>
    </>
  );
}
