import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { boardColumns } from './interfaces';

export const getColumnsList = createAsyncThunk(
  'columns/getColumnsList',
  async (id: string, { rejectWithValue }) => {
    return axios({
      method: 'get',
      url: `/boards/${id}/columns`,
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
    url: `/boards/${boardId}/columns`,
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
