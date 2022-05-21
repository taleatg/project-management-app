import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ColumnData } from './interfaces';

export const getColumnsList = createAsyncThunk(
  'columns/getColumnsList',
  async (id: string, { rejectWithValue }) => {
    return axios({
      method: 'get',
      url: `/boards/${id}/columns`,
    })
      .then((res) => {
        return res.data.sort((a: ColumnData, b: ColumnData) => (a.order > b.order ? 1 : -1));
      })
      .catch((error) => {
        if (error instanceof Error) {
          return rejectWithValue(error.message);
        }
      });
  }
);

export const postColumn = async (title: string, boardId: string) => {
  console.log(title);
  return axios({
    method: 'post',
    url: `/boards/${boardId}/columns`,
    data: { title },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const putColumn = async (
  { title, order }: { title: string; order: number },
  boardId: string,
  columnId: string
) => {
  return axios({
    method: 'put',
    url: `/boards/${boardId}/columns/${columnId}`,
    data: JSON.stringify({ title, order }),
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const deleteColumn = async (boardId: string, columnId: string) => {
  return axios({
    method: 'delete',
    url: `/boards/${boardId}/columns/${columnId}`,
  })
    .then(() => {
      return columnId;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const getColumns = async (boardId: string) => {
  return axios({
    method: 'get',
    url: `/boards/${boardId}/columns`,
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};
