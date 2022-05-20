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
import { useForm, SubmitHandler, UnpackNestedValue, Controller } from 'react-hook-form';
import { ColumnType, TaskData } from '../../../services/interfaces';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';

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
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ColumnType>();
  const { t } = useTranslation();

  const onSubmit: SubmitHandler<ColumnType> = async (data) => {
    setOpen(false);
    props.action(data);
    reset();
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    props.action(false);
    reset();
  };

  const getTaskData = (type: 'title' | 'description', currentState = '', rows = 1) => {
    return (
      <Controller
        control={control}
        name={type}
        defaultValue={currentState}
        rules={{
          required: true,
        }}
        render={({ field }) => (
          <>
            <TextField
              label={type === 'title' ? t('board.task_title') : t('board.task_description')}
              sx={{ marginTop: '20px' }}
              fullWidth
              multiline
              rows={rows}
              onChange={(e) => field.onChange(e)}
              value={field.value}
            />
            <FormHelperText error sx={{ height: '10px' }}>
              {errors[`${type}`] &&
                (type === 'title'
                  ? t('errors.title_is_required')
                  : t('errors.description_is_required'))}
            </FormHelperText>
          </>
        )}
      />
    );
  };

  return (
    <>
      {props.textAction === 'Create' ? (
        <Button size="small" fullWidth sx={{ textTransform: 'none' }} onClick={handleOpen}>
          <AddIcon fontSize="small" /> {t('board.add_task')}
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
            {props.textAction === 'Update' ? t('board.update_task') : t('board.add_task')}
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
            {getTaskData('title', props.task?.title)}
            {getTaskData('description', props.task?.description, 3)}
            <Button
              type="submit"
              variant="contained"
              onClick={handleSubmit(onSubmit)}
              sx={{ marginTop: '20px' }}
            >
              {props.textAction === 'Update' ? t('button.update') : t('button.create')}
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
}
