import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
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
import { useTranslation } from 'react-i18next';

export const AuthForm = (props: { whichPage: string }) => {
  const dispatch = useAppDispatch();
  const { switchAuthorization, setUserId, setCurrentUserData } = authSlice.actions;
  const { handleSubmit, control, reset } = useForm<SignInForm>();
  const setCookie = useCookies(['token', 'userId'])[1];
  const [authorization, setAuthorization] = useState(props.whichPage);
  const [backendErrors, setBackendErrors] = useState('');
  const { errors } = useFormState({ control });
  const navigate = useNavigate();
  const { t } = useTranslation();

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
      navigate('/signin');
    }
  };

  return (
    <>
      <div className="auth-form">
        <Typography variant="h4" component="div" gutterBottom>
          {authorization === 'signin'
            ? t('authorization.authorization')
            : t('authorization.registration')}
        </Typography>
        <form className="auth-form__form" onSubmit={handleSubmit(onSubmit)}>
          {authorization === 'signup'
            ? FormField(
                control,
                errors.name?.message,
                'name',
                t('authorization.name'),
                /^[A-Za-zА-Яа-я_]{2,}/,
                t('authorization.name_error'),
                'text',
                <PersonIcon sx={{ fontSize: '18px' }} />
              )
            : null}
          {FormField(
            control,
            errors.login?.message,
            'login',
            t('authorization.login'),
            /^[A-Za-z0-9]{5,}/,
            t('authorization.login_error'),
            'text',
            <AlternateEmailIcon sx={{ fontSize: '18px' }} />
          )}
          {FormField(
            control,
            errors.password?.message,
            'password',
            t('authorization.password'),
            /^[a-zA-Z0-9_]{8,}/,
            t('authorization.password_error'),
            'password',
            <LockIcon sx={{ fontSize: '18px' }} />
          )}
          <div className="button-container">
            <Button type="submit" variant="contained">
              {t('button.submit')}
            </Button>
          </div>
        </form>
      </div>

      {backendErrors ? <BackendResponse type="error" backendErrors={backendErrors} /> : null}
    </>
  );
};
