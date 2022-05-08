import axios from 'axios';
import { baseUrl } from './columnService';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getBoardsList = createAsyncThunk(
  'board/getBoardsList',
  async (token: string, { rejectWithValue }) => {
    return axios({
      method: 'get',
      url: `${baseUrl}/boards`,
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

export async function postBoard(token: string) {
  return axios({
    method: 'post',
    url: `${baseUrl}/boards`,
    data: { title: 'title' },
    headers: { Authorization: `Bearer ${token}` },
  }).catch(function (error) {
    throw error;
  });
}

export async function deleteBoard(id: string, token: string) {
  return axios({
    method: 'delete',
    url: `${baseUrl}/boards/${id}`,
    headers: { Authorization: `Bearer ${token}` },
  }).catch(function (error) {
    throw error;
  });
}
