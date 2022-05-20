import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getBoardsList = createAsyncThunk(
  'board/getBoardsList',
  async (token: string, { rejectWithValue }) => {
    return axios({
      method: 'get',
      url: `/boards`,
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

export const getBoardById = createAsyncThunk(
  'board/getBoardById',
  async (id: string, { rejectWithValue }) => {
    return axios({
      method: 'get',
      url: `/boards/${id}`,
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

export const postBoard = createAsyncThunk(
  'board/postBoard',
  async ({ title, description }: { title: string; description: string }, { rejectWithValue }) => {
    return axios({
      method: 'post',
      url: `/boards`,
      data: { title, description },
    })
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        if (error instanceof Error) {
          return rejectWithValue(error.message);
        }
      });
  }
);

export const deleteBoard = createAsyncThunk(
  'board/deleteBoard',
  async (id: string, { rejectWithValue }) => {
    return axios({
      method: 'delete',
      url: `/boards/${id}`,
    })
      .then(() => {
        return id;
      })
      .catch(function (error) {
        if (error instanceof Error) {
          return rejectWithValue(error.message);
        }
      });
  }
);
