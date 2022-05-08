import { Alert, Box, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';

export function BackendErrors(props: { backendErrors: string }) {
  const [openError, setOpenError] = useState(true);

  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={openError}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              onClick={() => {
                setOpenError(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {props.backendErrors}
        </Alert>
      </Collapse>
    </Box>
  );
}
