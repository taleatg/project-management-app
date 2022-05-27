import axios from 'axios';
import { boardColumns, ColumnData } from './interfaces';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getTasksInColumn = createAsyncThunk(
  'columns/getTasksInColumn',
  async ({ boardId, columnId }: { boardId: string; columnId: string }, { rejectWithValue }) => {
    return axios({
      method: 'get',
      url: `/boards/${boardId}/columns/${columnId}/tasks`,
    })
      .then((res) => {
        return {
          tasks: res.data.sort((a: ColumnData, b: ColumnData) => (a.order > b.order ? 1 : -1)),
          columnId: columnId,
        };
      })
      .catch((error) => {
        if (error instanceof Error) {
          return rejectWithValue(error.message);
        }
      });
  }
);

export const deleteTask = async ({
  boardId,
  columnId,
  taskId,
}: {
  boardId: string;
  columnId: string;
  taskId: string;
}) => {
  return axios({
    method: 'delete',
    url: `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
  })
    .then(() => {
      return { columnId: columnId, taskId: taskId };
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const postTask = async ({ body, boardId, columnId }: boardColumns) => {
  return axios({
    method: 'post',
    url: `/boards/${boardId}/columns/${columnId}/tasks`,
    data: JSON.stringify(body),
  })
    .then((res) => {
      return { data: res.data, boardId: boardId, columnId: columnId };
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const editTask = async ({ body, boardId, columnId, taskId }: boardColumns) => {
  return axios({
    method: 'put',
    url: `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
    data: JSON.stringify(body),
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const getTasks = async ({ boardId, columnId }: { boardId: string; columnId: string }) => {
  return axios({
    method: 'get',
    url: `/boards/${boardId}/columns/${columnId}/tasks`,
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const searchTask = async () => {
  return axios({
    method: 'get',
    url: 'search/tasks',
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};
