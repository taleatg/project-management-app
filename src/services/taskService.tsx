import axios from 'axios';
import { boardColumns } from './interfaces';

export const getTasksInColumn = async ({
  boardId,
  columnId,
}: {
  boardId: string;
  columnId: string;
}) => {
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
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const addTask = async ({ body, boardId, columnId }: boardColumns) => {
  return axios({
    method: 'post',
    url: `/boards/${boardId}/columns/${columnId}/tasks`,
    data: JSON.stringify(body),
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};
