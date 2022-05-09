import axios from 'axios';
import { boardColumns } from './interfaces';

const baseUrl = 'https://project-management-app.herokuapp.com';

export const setBoardColumn = async ({ body, boardId, token, method }: boardColumns) => {
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
