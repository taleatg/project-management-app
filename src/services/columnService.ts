import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { boardColumns } from './interfaces';

export const getColumnsList = createAsyncThunk(
  'columns/getColumnsList',
  async (path: string, { rejectWithValue }) => {
    return axios({
      method: 'get',
      url: path,
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

export const columnAction = async ({ body, method, path }: boardColumns) => {
  return axios({
    method: method,
    url: path,
    data: JSON.stringify(body),
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};
