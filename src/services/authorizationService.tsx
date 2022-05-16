import axios from 'axios';

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

export const getUser = async (userId: string) => {
  return axios({
    method: 'GET',
    url: `/users/${userId}`,
  })
    .then((res) => res.data)
    .catch((err) => err.response.data);
};
