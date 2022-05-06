import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { useForm, Controller, SubmitHandler, useFormState } from 'react-hook-form';
import './AuthForm.scss';

interface SignInForm {
  name: string;
  login: string;
  password: string;
}

export const AuthForm = () => {
  const { handleSubmit, control, reset } = useForm<SignInForm>();
  const [authorization, setAuthorization] = useState('login');
  const { errors } = useFormState({ control });

  const onSubmit: SubmitHandler<SignInForm> = (data) => {
    console.log(data);
    reset({
      name: '',
      login: '',
      password: '',
    });
  };

  const switchAuthorization = () => {
    setAuthorization(authorization === 'login' ? 'signUp' : 'login');
  };

  const createInput = (
    name: 'login' | 'name' | 'password',
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
          validate: (value: string) => {
            if (!value.match(validate)) {
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
            error={!!errors[name]?.message}
            helperText={errors[name]?.message}
          />
        )}
      />
    );
  };

  return (
    <div className="auth-form">
      <Typography variant="h4" component="div" gutterBottom>
        {authorization === 'login' ? 'Authorization' : 'Registration'}
      </Typography>
      <form className="auth-form__form" onSubmit={handleSubmit(onSubmit)}>
        {authorization === 'signUp'
          ? createInput('name', /^[A-Za-zА-Яа-я_]{2,}/, 'Enter at least two letters', 'text')
          : null}
        {createInput(
          'login',
          /^[A-Za-z0-9]{5,}/,
          'Login must contain at least 5 Latin letters or numbers',
          'text'
        )}
        {createInput(
          'password',
          /\w{8,}/,
          'Password must contain at least 8 characters',
          'password'
        )}
        <div className="button-container">
          <Button type="submit" variant="contained">
            Submit
          </Button>
          <Button variant="outlined" onClick={switchAuthorization}>
            {authorization === 'login' ? 'Sign up' : 'Login'}
          </Button>
        </div>
      </form>
    </div>
  );
};
