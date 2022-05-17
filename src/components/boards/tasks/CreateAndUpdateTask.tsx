import * as React from 'react';
import { Box, Button, Typography, Modal, TextField, IconButton } from '@mui/material';
import { useForm, SubmitHandler, UnpackNestedValue } from 'react-hook-form';
import { ColumnType, TaskData } from '../../../services/interfaces';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

interface TaskProps {
  task?: TaskData;
  action: (data: UnpackNestedValue<ColumnType> | false) => void;
  button?: JSX.Element;
  columnId: string;
  textAction: string;
  open?: boolean;
}

export function CreateAndUpdateTask(props: TaskProps) {
  const [open, setOpen] = React.useState(props?.open || false);
  const { handleSubmit, reset, register } = useForm<ColumnType>();

  const onSubmit: SubmitHandler<ColumnType> = async (data) => {
    setOpen(false);
    props.action(data);
    reset();
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    props.action(false);
  };

  const getTaskData = (type: 'title' | 'description', rows = 1) => {
    return (
      <TextField
        {...register(`${type}`, { required: true })}
        label={'Task ' + type}
        sx={{ marginTop: '20px' }}
        fullWidth
        defaultValue={props.task ? props.task[`${type}`] : ''}
        multiline
        rows={rows}
      />
    );
  };

  return (
    <>
      {props.textAction === 'Create' ? (
        <Button size="small" fullWidth sx={{ textTransform: 'none' }} onClick={handleOpen}>
          <AddIcon fontSize="small" /> Add task
        </Button>
      ) : null}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-wrapper">
          <Typography id="modal-modal-title" variant="h6" component="p">
            {`${props.textAction} task`}
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
            {getTaskData('title')}
            {getTaskData('description', 3)}
            <Button
              type="submit"
              variant="contained"
              onClick={handleSubmit(onSubmit)}
              sx={{ marginTop: '20px' }}
            >
              {props.textAction}
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
}
