import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const baseUrl = 'https://project-management-app.herokuapp.com';

export const getColumnsList = createAsyncThunk(
  'columns/getColumnsList',
  async ({ token, id }: { token: string; id: string }, { rejectWithValue }) => {
    return axios({
      method: 'get',
      url: `${baseUrl}/boards/${id}/columns`,
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

export class getColumnList {}
