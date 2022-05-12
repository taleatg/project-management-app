import axios from 'axios';

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
