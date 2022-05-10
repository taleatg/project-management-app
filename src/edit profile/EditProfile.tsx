import React, { useState } from 'react';
import { SubmitHandler, useForm, useFormState } from 'react-hook-form';
import { Button, Typography } from '@mui/material';
import { FormField } from '../authorization form/FormFields';
import { SignInForm } from '../services/interfaces';
import './EditProfile.scss';
import { deleteUser, updateUser } from '../services/authorizationService';
import { useAppDispatch, useAppSelector } from '../store/store';
import ConfirmationModal from '../components/ConfirmationModal';
import { BackendResponse } from '../authorization form/BackendResponse';
import { useNavigate } from 'react-router-dom';
import { authSlice } from '../store/reducers/authenticationSlice';

export function EditProfile() {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.authReducer);
  const { switchAuthorization } = authSlice.actions;
  const { handleSubmit, control, reset } = useForm<SignInForm>();
  const { errors } = useFormState({ control });
  const { userId } = useAppSelector((state) => state.authReducer);
  const [backendErrors, setBackendErrors] = useState('');
  const [isSuccessfulUpdate, setIsSuccessfulUpdate] = useState(false);
  const navigate = useNavigate();

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
        token: token,
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
    navigate('/home');
    dispatch(switchAuthorization(false));
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
              /^[A-Za-zА-Яа-я_]{2,}/,
              'Enter at least two letters',
              'text'
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
              /^[A-Za-z0-9]{5,}/,
              'Login must contain at least 5 Latin letters or numbers',
              'text'
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
              /^[a-zA-Z0-9_]{8,}/,
              'Password must contain at least 8 characters',
              'password'
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
              /^[a-zA-Z0-9_]{8,}/,
              'Password must contain at least 8 characters',
              'password'
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
