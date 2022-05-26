import { Alert, AlertColor } from '@mui/material';
import React from 'react';

export function BackendResponse(props: { backendErrors: string; type: AlertColor }) {
  return (
    <Alert sx={{ mt: 2 }} severity={props.type} className="backend-errors">
      {props.backendErrors}
    </Alert>
  );
}
