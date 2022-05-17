import axios from 'axios';
import { UserData } from './interfaces';

interface signIn {
  body?: Record<string, string>;
  path?: string;
  method?: string;
  token?: string;
}

export const signIn = async ({ body, path }: signIn) => {
  return axios({
    method: 'POST',
    url: `/${path}`,
    data: JSON.stringify(body),
  })
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

export const deleteUser = async (path: string) => {
  return axios({
    method: 'DELETE',
    url: `/${path}`,
  }).catch((err) => err.response.data);
};

export const updateUser = async ({ body, path, method }: signIn) => {
  return axios({
    method: method,
    url: `/${path}`,
    data: JSON.stringify(body),
  })
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

export const getUserById = async (userId: string) => {
  return axios({
    method: 'GET',
    url: `/users/${userId}`,
  })
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

export const getUserData = async (userId: string): Promise<UserData> => {
  if (localStorage.getItem('userData')) {
    return JSON.parse(localStorage.getItem('userData') as string);
  } else {
    await setUserDataInLocalStorage(userId);
    return await getUserData(userId);
  }
};

export const setUserDataInLocalStorage = async (userId: string) => {
  const userData = await getUserById(userId);
  localStorage.setItem('userData', JSON.stringify(userData));
  return userData;
};
