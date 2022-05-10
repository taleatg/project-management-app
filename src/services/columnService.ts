import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { boardColumns } from './interfaces';

export const baseUrl = 'https://project-management-app.herokuapp.com';

export const getColumnsList = createAsyncThunk(
  'columns/getColumnsList',
  async ({ token, path }: { token: string; path: string }, { rejectWithValue }) => {
    return axios({
      method: 'get',
      url: `${baseUrl}/${path}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        if (error instanceof Error) {
          return rejectWithValue(error.message);
        }
      });
  }
);

export const columnAction = async ({ body, boardId, token, method }: boardColumns) => {
  return axios({
    method: method,
    url: `${baseUrl}/boards/${boardId}/columns`,
    data: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};
