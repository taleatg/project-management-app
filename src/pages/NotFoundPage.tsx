import React from 'react';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const NotFoundPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Container maxWidth="xl" className="not-found">
      <h2>{t('errors.page_not_found')}</h2>
      <Button variant={'contained'} onClick={() => navigate('/welcome')}>
        {t('button.go_to_main')}
      </Button>
    </Container>
  );
};
