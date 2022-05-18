import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import { useForm, SubmitHandler, useFormState } from 'react-hook-form';
import { getUserData, signIn } from '../../services/authorizationService';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/store';
import { authSlice } from '../../store/reducers/authenticationSlice';
import { FormField } from './FormFields';
import { BackendResponse } from './BackendResponse';
import { SignInForm } from '../../services/interfaces';
import './AuthForm.scss';
import { useCookies } from 'react-cookie';

export const AuthForm = () => {
  const dispatch = useAppDispatch();
  const { switchAuthorization, setUserId, setCurrentUserData } = authSlice.actions;
  const { handleSubmit, control, reset, setValue } = useForm<SignInForm>();
  const setCookie = useCookies(['token', 'userId'])[1];
  const [authorization, setAuthorization] = useState('signin');
  const [backendErrors, setBackendErrors] = useState('');
  const { errors } = useFormState({ control });
  const navigate = useNavigate();

  const authorizationSwitch = () => {
    setAuthorization(authorization === 'signin' ? 'signup' : 'signin');
  };

  const parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  const onSubmit: SubmitHandler<SignInForm> = async (data) => {
    const body: Record<string, string> = {
      login: data.login,
      password: data.password,
    };
    if (authorization === 'signup') {
      body.name = data.name;
    }
    reset();

    const signin = await signIn({ body: body, path: authorization });

    if (signin.token) {
      const decoded = parseJwt(signin.token);
      navigate('/home');
      dispatch(setUserId(decoded.userId));
      setCookie('token', signin.token, { path: '/', maxAge: 24 * 3600 });
      setCookie('userId', decoded.userId, { path: '/', maxAge: 24 * 3600 });
      setTimeout(async () => {
        const userData = await getUserData(decoded.userId);
        dispatch(setCurrentUserData(userData));
      }, 10);
      dispatch(switchAuthorization(true));
    } else if (signin.message) {
      setBackendErrors(signin.message);
      setTimeout(() => {
        setBackendErrors('');
      }, 5000);
    } else if (signin.id) {
      setAuthorization('signin');
      setValue('login', data.login);
      setValue('password', data.password);
    }
  };

  return (
    <>
      <div className="auth-form">
        <Typography variant="h4" component="div" gutterBottom>
          {authorization === 'signin' ? 'Authorization' : 'Registration'}
        </Typography>
        <form className="auth-form__form" onSubmit={handleSubmit(onSubmit)}>
          {authorization === 'signup'
            ? FormField(
                control,
                errors.name?.message,
                'name',
                /^[A-Za-zА-Яа-я_]{2,}/,
                'Enter at least two letters',
                'text'
              )
            : null}
          {FormField(
            control,
            errors.login?.message,
            'login',
            /^[A-Za-z0-9]{5,}/,
            'Login must contain at least 5 Latin letters or numbers',
            'text'
          )}
          {FormField(
            control,
            errors.password?.message,
            'password',
            /^[a-zA-Z0-9_]{8,}/,
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

      {backendErrors ? <BackendResponse type="error" backendErrors={backendErrors} /> : null}
    </>
  );
};
