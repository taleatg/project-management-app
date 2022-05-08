import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import { SignInForm } from './AuthForm';

export const FormField = (
  control: Control<SignInForm>,
  errorMessage: string | undefined,
  name: 'login' | 'name' | 'password' | 'repeatPassword',
  validate: RegExp,
  error: string,
  type: string
) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      rules={{
        required: `Enter ${name}`,
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
        />
      )}
    />
  );
};
