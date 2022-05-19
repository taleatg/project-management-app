import React, { useState } from 'react';
import { SubmitHandler, useForm, useFormState } from 'react-hook-form';
import { Button, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { FormField } from '../authorization form/FormFields';
import { SignInForm } from '../../services/interfaces';
import './EditProfile.scss';
import { deleteUser, updateUser } from '../../services/authorizationService';
import { useAppDispatch, useAppSelector } from '../../store/store';
import ConfirmationModal from '../ConfirmationModal';
import { BackendResponse } from '../authorization form/BackendResponse';
import { useNavigate } from 'react-router-dom';
import { authSlice } from '../../store/reducers/authenticationSlice';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';

export function EditProfile() {
  const dispatch = useAppDispatch();
  const { switchAuthorization } = authSlice.actions;
  const { handleSubmit, control, reset } = useForm<SignInForm>();
  const { errors } = useFormState({ control });
  const { userId } = useAppSelector((state) => state.authReducer);
  const [backendErrors, setBackendErrors] = useState('');
  const [isSuccessfulUpdate, setIsSuccessfulUpdate] = useState(false);
  const navigate = useNavigate();
  const removeCookie = useCookies(['token', 'userId'])[2];
  const { t } = useTranslation();

  const onSubmit: SubmitHandler<SignInForm> = async (data) => {
    const body: Record<string, string> = {
      name: data.name,
      login: data.login,
      password: data.password,
    };

    if (data.password === data.repeatPassword) {
      const signin = await updateUser({
        body: body,
        path: `users/${userId}`,
        method: 'PUT',
      });
      reset();

      if (signin.message) {
        setBackendErrors(signin.message);
      }

      if (signin.id) {
        setIsSuccessfulUpdate(true);
      }
    } else {
      setBackendErrors("Passwords don't match");
    }

    setTimeout(() => {
      setBackendErrors('');
      setIsSuccessfulUpdate(false);
    }, 5000);
  };

  const deleteAccount = async () => {
    await deleteUser(`users/${userId}`);
    localStorage.removeItem('userData');
    navigate('/home');
    dispatch(switchAuthorization(false));
    removeCookie('token');
    removeCookie('userId');
  };

  return (
    <>
      <div className="edit-profile">
        <Typography variant="h4" component="div" gutterBottom>
          Edit profile
        </Typography>
        <form className="edit-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="edit-value">
            <Typography variant="h6" component="div" gutterBottom noWrap>
              Name:
            </Typography>
            {FormField(
              control,
              errors.name?.message,
              'name',
              t('authorization.name'),
              /^[A-Za-zА-Яа-я_]{2,}/,
              'Enter at least two letters',
              'text',
              <PersonIcon sx={{ fontSize: '18px' }} />
            )}
          </div>
          <div className="edit-value">
            <Typography variant="h6" component="div" gutterBottom noWrap>
              Login:
            </Typography>
            {FormField(
              control,
              errors.login?.message,
              'login',
              t('authorization.login'),
              /^[A-Za-z0-9]{5,}/,
              'Login must contain at least 5 Latin letters or numbers',
              'text',
              <AlternateEmailIcon sx={{ fontSize: '18px' }} />
            )}
          </div>
          <div className="edit-value">
            <Typography variant="h6" component="div" gutterBottom noWrap>
              Password:
            </Typography>
            {FormField(
              control,
              errors.password?.message,
              'password',
              t('authorization.password'),
              /^[a-zA-Z0-9_]{8,}/,
              'Password must contain at least 8 characters',
              'password',
              <LockIcon sx={{ fontSize: '18px' }} />
            )}
          </div>
          <div className="edit-value">
            <Typography variant="h6" component="div" gutterBottom noWrap>
              Repeat password:
            </Typography>
            {FormField(
              control,
              errors.repeatPassword?.message,
              'repeatPassword',
              t('authorization.password'),
              /^[a-zA-Z0-9_]{8,}/,
              'Password must contain at least 8 characters',
              'password',
              <LockIcon sx={{ fontSize: '18px' }} />
            )}
          </div>
          <div className="button-container">
            <ConfirmationModal textButton="delete account" confirmedAction={deleteAccount} />
            <Button type="submit" variant="contained">
              Update
            </Button>
          </div>
        </form>
      </div>
      {backendErrors ? <BackendResponse type="error" backendErrors={backendErrors} /> : null}
      {isSuccessfulUpdate ? (
        <BackendResponse type="success" backendErrors="User data has been successfully updated!" />
      ) : null}
    </>
  );
}
