import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { useForm, Controller, SubmitHandler, useFormState } from 'react-hook-form';
import { signIn } from './services';
import { useNavigate } from 'react-router-dom';
import './AuthForm.scss';

interface SignInForm {
  name: string;
  login: string;
  password: string;
}

export const AuthForm = () => {
  const { handleSubmit, control, reset } = useForm<SignInForm>();
  const [authorization, setAuthorization] = useState('signin');
  const { errors } = useFormState({ control });
  const navigate = useNavigate();

  const authorizationSwitch = () => {
    setAuthorization(authorization === 'signin' ? 'signup' : 'signin');
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

  const onSubmit: SubmitHandler<SignInForm> = async (data) => {
    const body: Record<string, string> = {
      login: data.login,
      password: data.password,
    };
    if (authorization === 'signup') {
      body.name = data.name;
      setAuthorization('signin');
    }
    reset({
      name: '',
      login: '',
      password: '',
    });

    const signin = await signIn(
      body,
      `https://project-management-app.herokuapp.com/${authorization}`
    );

    if (signin.token) {
      navigate('/home');
    }
  };

  return (
    <div className="auth-form">
      <Typography variant="h4" component="div" gutterBottom>
        {authorization === 'signin' ? 'Authorization' : 'Registration'}
      </Typography>
      <form className="auth-form__form" onSubmit={handleSubmit(onSubmit)}>
        {authorization === 'signup'
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
          <Button variant="outlined" onClick={authorizationSwitch}>
            {authorization === 'signin' ? 'Sign up' : 'Login'}
          </Button>
        </div>
      </form>
    </div>
  );
};
