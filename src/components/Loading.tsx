import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

export const Loading = () => {
  const { t } = useTranslation();

  return (
    <Box className="loading-wrapper">
      <CircularProgress sx={{ m: '0 auto' }} />
      <Typography variant="h5" component="h5" sx={{ mt: '10px', color: '#484bee' }}>
        {t('search.loading')}
      </Typography>
    </Box>
  );
};
