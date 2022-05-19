import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { InputAdornment, TextField } from '@mui/material';
import { SignInForm } from '../../services/interfaces';
import { useTranslation } from 'react-i18next';

export const FormField = (
  control: Control<SignInForm>,
  errorMessage: string | undefined,
  field: 'login' | 'name' | 'password' | 'repeatPassword',
  name: string,
  validate: RegExp,
  error: string,
  type: string,
  icon: JSX.Element
) => {
  const { t } = useTranslation();
  return (
    <Controller
      control={control}
      name={field}
      defaultValue=""
      rules={{
        required: `${t('authorization.enter')} ${name}`,
        validate: (value: string | undefined) => {
          if (!value?.match(validate)) {
            return error;
          }
          return true;
        },
      }}
      render={({ field }) => (
        <TextField
          label={name}
          type={type}
          className="auth-input"
          fullWidth
          onChange={(e) => field.onChange(e)}
          value={field.value}
          error={!!errorMessage}
          helperText={errorMessage}
          InputProps={{
            startAdornment: <InputAdornment position="start">{icon}</InputAdornment>,
          }}
        />
      )}
    />
  );
};
